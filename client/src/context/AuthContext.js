import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../config/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    console.log('🔍 Checking localStorage for user data...');
    
    try {
      const savedUser = storage.getUser();
      const savedUserData = storage.getUserData();
      const isLoggedIn = storage.isLoggedIn();
      
      if (isLoggedIn && savedUser) {
        console.log('✅ User found in localStorage:', savedUser);
        setUser(savedUser);
        
        if (savedUserData) {
          console.log('✅ User data found in localStorage:', savedUserData);
          setUserData(savedUserData);
        } else {
          // Create default user data if not exists
          const defaultUserData = {
            uid: savedUser.email,
            email: savedUser.email,
            name: savedUser.name || 'User',
            phone: '',
            address: '',
            profilePicture: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setUserData(defaultUserData);
          storage.setUserData(defaultUserData);
        }
      } else {
        console.log('ℹ️ User not logged in, but checking for profile data...');
        // Load profile data even if not logged in
        if (savedUserData) {
          console.log('✅ Profile data found:', savedUserData);
          setUserData(savedUserData);
        } else {
          console.log('ℹ️ No profile data found');
          setUserData(null);
        }
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Error checking localStorage:', error);
      setUser(null);
      setUserData(null);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    console.log('🔐 Attempting login with email:', email);
    
    try {
      // Simple mock authentication (in real app, this would be an API call)
      const mockUser = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        uid: email, // Use email as UID
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      storage.setUser(mockUser);
      
      // Create default user data if not exists
      const existingUserData = storage.getUserData();
      if (!existingUserData) {
        const defaultUserData = {
          uid: email,
          email: email,
          name: mockUser.name,
          phone: '',
          address: '',
          profilePicture: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        storage.setUserData(defaultUserData);
        setUserData(defaultUserData);
      }
      
      setUser(mockUser);
      console.log('✅ Login successful:', mockUser);
      return { success: true, user: mockUser };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    console.log('📝 Attempting signup with email:', email);
    
    try {
      // Simple mock signup (in real app, this would be an API call)
      const mockUser = {
        email: email,
        name: name,
        uid: email, // Use email as UID
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      storage.setUser(mockUser);
      
      // Create user data
      const userData = {
        uid: email,
        email: email,
        name: name,
        phone: '',
        address: '',
        profilePicture: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      storage.setUserData(userData);
      setUserData(userData);
      setUser(mockUser);
      
      console.log('✅ Signup successful:', mockUser);
      return { success: true, user: mockUser };
      
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  // Update user profile function
  const updateUserProfile = async (newUserData) => {
    console.log('🔄 Updating user profile:', newUserData);
    
    try {
      const updatedUserData = {
        ...newUserData,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      storage.setUserData(updatedUserData);
      setUserData(updatedUserData);
      
      console.log('✅ Profile updated successfully');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  // Logout function
  const logout = async () => {
    console.log('🚪 Logging out user...');
    
    try {
      // Remove login state only (keep profile data)
      storage.removeLoginState();
      
      // Clear state
      setUser(null);
      // Keep userData in state so profile data persists
      
      console.log('✅ Logout successful (profile data preserved)');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  const value = {
    user,
    userData,
    loading,
    login,
    signup,
    updateUserProfile,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
