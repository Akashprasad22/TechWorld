import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getApp, initializeApp } from 'firebase/app';
import { useAuth } from '../context/AuthContext';

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase app and get storage instance
let app;
let storage;

// Function to initialize Firebase Storage
const initializeFirebaseStorage = () => {
  try {
    // Check if Firebase app is already initialized
    try {
      app = getApp();
      console.log('Using existing Firebase app instance');
    } catch (error) {
      console.log('Initializing new Firebase app instance');
      app = initializeApp(firebaseConfig);
    }
    
    // Initialize Storage
    storage = getStorage(app);
    console.log('Firebase Storage initialized successfully');
    console.log('Storage bucket:', firebaseConfig.storageBucket);
    
    return true;
  } catch (error) {
    console.error('Firebase Storage initialization error:', error);
    console.error('Error details:', error.code, error.message);
    return false;
  }
};

// Initialize storage on module load
const isStorageInitialized = initializeFirebaseStorage();

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f;
`;

const ProfilePicture = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;
  cursor: ${props => props.isEditing ? 'pointer' : 'default'};
  
  ${props => props.isEditing && `
    &:hover {
      transform: scale(1.05);
    }
    
    &::after {
      content: '📷';
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 1.2rem;
      background: rgba(0,0,0,0.7);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  i {
    font-size: 3rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1.8rem;
`;

const ProfileEmail = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 1rem;
`;

const ProfilePhone = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 1rem;
`;

const ProfileAddress = styled.p`
  margin: 0.25rem 0 0 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    transform: none;
    box-shadow: none;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-decoration: none;
  color: #1a1a2e;
  transition: all 0.3s;
  border: 1px solid transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    border-color: #667eea;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #1a1a2e;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  width: 100%;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const { user, userData, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('Profile component - user:', user);
  console.log('Profile component - userData:', userData);

  // Update editedUser when userData changes
  useEffect(() => {
    console.log('userData changed, updating editedUser:', userData);
    if (userData) {
      setEditedUser(userData);
    }
  }, [userData]);

  // Reset editedUser when exiting edit mode
  useEffect(() => {
    if (!isEditing && userData) {
      setEditedUser(userData);
      setPreviewImage(userData.profilePicture || null);
    }
  }, [isEditing, userData]);

  const inputStyles = {
    fontSize: '1rem',
    border: '2px solid #e1e5e9',
    padding: '0.75rem',
    borderRadius: '8px',
    width: '100%',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const inputFocusStyles = {
    ...inputStyles,
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    backgroundColor: '#f8f9ff'
  };

  const nameInputStyles = {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    ...inputStyles
  };

  const nameInputFocusStyles = {
    ...nameInputStyles,
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    backgroundColor: '#f8f9ff'
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333'
  };

  const handleImageChange = async (e) => {
    console.log('handleImageChange triggered');
    const file = e.target.files[0];
    console.log('Selected file:', file);
    
    if (!file) {
      console.log('No file selected');
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      alert('Please select a valid image file (JPG, JPEG, PNG, or WebP)');
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      console.error('File too large:', file.size);
      alert('Please select an image smaller than 5MB');
      return;
    }
    
    try {
      console.log('Valid image file selected, creating preview...');
      
      // Show immediate preview using FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('Local preview generated successfully');
        setPreviewImage(event.target.result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        alert('Failed to read the selected image');
      };
      reader.readAsDataURL(file);
      
      console.log('Image preview set, waiting for save to upload to Firebase');
    } catch (error) {
      console.error('Error creating image preview:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const triggerFileInput = () => {
    console.log('triggerFileInput called, isEditing:', isEditing);
    if (isEditing) {
      const input = document.getElementById('profile-picture-input');
      console.log('File input element:', input);
      if (input) {
        input.click();
      } else {
        console.error('File input element not found');
      }
    } else {
      console.log('Not in edit mode, file upload disabled');
    }
  };

  const handleEdit = () => {
    console.log('Entering edit mode');
    console.log('Current userData for editing:', userData);
    
    if (!userData) {
      console.error('No userData available for editing');
      return;
    }
    
    setIsEditing(true);
    setEditedUser({...userData});
    setPreviewImage(userData.profilePicture || null);
  };

  const handleSave = async () => {
    console.log('handleSave triggered');
    console.log('Storage initialized:', isStorageInitialized);
    console.log('Current editedUser:', editedUser);
    console.log('Current previewImage:', previewImage);
    
    // Check if user is authenticated
    if (!user) {
      console.error('No authenticated user found');
      alert('Please login to update your profile');
      return;
    }
    
    // Check if Firebase Storage is properly initialized
    if (!isStorageInitialized || !storage) {
      console.error('Firebase Storage not properly initialized');
      console.log('Firebase config:', firebaseConfig);
      alert('Firebase Storage not properly configured. Please check your Firebase settings.');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Loading state set to true');
      
      // Validate required fields
      if (!editedUser.name || !editedUser.email) {
        console.error('Required fields missing');
        alert('Please fill in all required fields');
        return;
      }
      
      let finalProfilePicture = editedUser.profilePicture;
      
      // Upload new image if there's a preview image that's different from current
      if (previewImage && previewImage !== editedUser.profilePicture) {
        console.log('Uploading new profile image...');
        
        try {
          // Get the actual file from the file input
          const fileInput = document.getElementById('profile-picture-input');
          const file = fileInput.files[0];
          
          if (!file) {
            console.error('No file found in input');
            throw new Error('No file selected');
          }
          
          console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
          console.log('User UID:', user.uid);
          
          // Create a unique filename with user UID
          const fileName = `profile_${user.uid}_${Date.now()}_${file.name}`;
          const storageRef = ref(storage, `profile-pictures/${fileName}`);
          
          console.log('Storage reference created:', storageRef.fullPath);
          console.log('Starting Firebase Storage upload...');
          
          // Upload to Firebase Storage
          const uploadResult = await uploadBytes(storageRef, file);
          console.log('Upload completed successfully:', uploadResult);
          
          console.log('Getting download URL...');
          finalProfilePicture = await getDownloadURL(storageRef);
          console.log('Download URL received:', finalProfilePicture);
          
        } catch (uploadError) {
          console.error('Firebase Storage upload error:', uploadError);
          console.error('Error code:', uploadError.code);
          console.error('Error message:', uploadError.message);
          
          // Provide specific error messages
          if (uploadError.code === 'storage/unauthorized') {
            throw new Error('Storage access denied. Please check Firebase Storage rules in the Firebase console.');
          } else if (uploadError.code === 'storage/canceled') {
            throw new Error('Upload was cancelled');
          } else if (uploadError.code === 'storage/unknown') {
            throw new Error('Storage error: ' + uploadError.message);
          } else if (uploadError.code === 'storage/retry-limit-exceeded') {
            throw new Error('Upload retry limit exceeded. Please try again later.');
          } else {
            throw new Error('Failed to upload image: ' + uploadError.message);
          }
        }
      }
      
      // Update user profile using AuthContext
      console.log('Updating user profile via AuthContext...');
      const updatedUser = {
        ...editedUser,
        profilePicture: finalProfilePicture
      };
      
      await updateUserProfile(updatedUser);
      console.log('Profile updated successfully via AuthContext');
      
      setIsEditing(false);
      console.log('Edit mode disabled');
      
      alert('Profile updated successfully!');
      console.log('Profile save process completed successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error stack:', error.stack);
      alert('Failed to update profile: ' + error.message);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Canceling edit mode');
    console.log('Resetting to userData:', userData);
    
    if (userData) {
      setEditedUser({...userData});
      setPreviewImage(userData.profilePicture || null);
    } else {
      setEditedUser({});
      setPreviewImage(null);
    }
    
    setIsEditing(false);
  };

  const handleLogout = async () => {
    console.log('Logging out user...');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfilePicture isEditing={isEditing} onClick={isEditing ? triggerFileInput : undefined}>
            {previewImage || userData?.profilePicture ? (
              <img src={previewImage || userData?.profilePicture} alt="Profile" />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </ProfilePicture>
          {isEditing && (
            <input
              id="profile-picture-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          )}
          <ProfileInfo>
            {isEditing ? (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyles}>Name</label>
                  <input
                    type="text"
                    value={editedUser.name || ''}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    placeholder="Enter your full name"
                    style={nameInputStyles}
                    onFocus={(e) => Object.assign(e.target.style, nameInputFocusStyles)}
                    onBlur={(e) => Object.assign(e.target.style, nameInputStyles)}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyles}>Email</label>
                  <input
                    type="email"
                    value={editedUser.email || ''}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    placeholder="Enter your email address"
                    style={inputStyles}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyles}>Phone</label>
                  <input
                    type="tel"
                    value={editedUser.phone || ''}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    style={inputStyles}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyles}>Address</label>
                  <textarea
                    value={editedUser.address || ''}
                    onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                    placeholder="Enter your full address"
                    style={{...inputStyles, minHeight: '80px', resize: 'vertical'}}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                  />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <EditButton onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </EditButton>
                  <EditButton onClick={handleCancel} style={{ background: '#6c757d' }} disabled={loading}>
                    Cancel
                  </EditButton>
                </div>
              </>
            ) : (
              <>
                <ProfileName>{userData?.name || 'User'}</ProfileName>
                {userData?.email && <ProfileEmail>📧 {userData.email}</ProfileEmail>}
                {userData?.phone && <ProfilePhone>📱 {userData.phone}</ProfilePhone>}
                {userData?.address && <ProfileAddress>📍 {userData.address}</ProfileAddress>}
                <EditButton onClick={handleEdit}>Edit Profile</EditButton>
              </>
            )}
          </ProfileInfo>
        </ProfileHeader>
      </ProfileCard>

      <SectionGrid>
        <SectionCard as="div" onClick={() => navigate('/orders')}>
          <SectionTitle>
            <i className="fas fa-shopping-bag"></i>
            My Orders
          </SectionTitle>
          <SectionDescription>
            View your order history, track shipments, and manage returns
          </SectionDescription>
        </SectionCard>

        <SectionCard as="div" onClick={() => navigate('/settings')}>
          <SectionTitle>
            <i className="fas fa-cog"></i>
            Account Settings
          </SectionTitle>
          <SectionDescription>
            Manage your account preferences, payment methods, and security settings
          </SectionDescription>
        </SectionCard>

        <SectionCard as="div" onClick={() => navigate('/wishlist')}>
          <SectionTitle>
            <i className="fas fa-heart"></i>
            Wishlist
          </SectionTitle>
          <SectionDescription>
            View and manage your saved items and favorite products
          </SectionDescription>
        </SectionCard>
      </SectionGrid>

      <ProfileCard style={{ marginTop: '2rem' }}>
        <LogoutButton onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </LogoutButton>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
