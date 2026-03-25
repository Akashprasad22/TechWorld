import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;
  
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
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
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Tech Street, Bangalore, Karnataka 560001, India',
    profilePicture: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage or API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewImage(event.target.result);
          setEditedUser({...editedUser, profilePicture: event.target.result});
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPG, JPEG, or PNG)');
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profile-picture-input').click();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
    setPreviewImage(user.profilePicture);
  };

  const handleSave = () => {
    const updatedUser = {...editedUser, profilePicture: previewImage || editedUser.profilePicture};
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setPreviewImage(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfilePicture onClick={triggerFileInput}>
            {previewImage || user.profilePicture ? (
              <img src={previewImage || user.profilePicture} alt="Profile" />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </ProfilePicture>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <ProfileInfo>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  style={{ fontSize: '1.8rem', marginBottom: '0.5rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }}
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  style={{ fontSize: '1rem', marginBottom: '0.25rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px', width: '100%' }}
                />
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  style={{ fontSize: '1rem', marginBottom: '0.25rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px', width: '100%' }}
                />
                <textarea
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                  style={{ fontSize: '1rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px', width: '100%', minHeight: '60px', resize: 'vertical' }}
                />
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <EditButton onClick={handleSave}>Save</EditButton>
                  <EditButton onClick={handleCancel} style={{ background: '#6c757d' }}>Cancel</EditButton>
                </div>
              </>
            ) : (
              <>
                <ProfileName>{user.name}</ProfileName>
                <ProfileEmail>📧 {user.email}</ProfileEmail>
                <ProfilePhone>📱 {user.phone}</ProfilePhone>
                <ProfileAddress>📍 {user.address}</ProfileAddress>
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
