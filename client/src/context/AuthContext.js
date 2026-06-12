import React, { createContext, useContext, useMemo } from 'react';
import { useClerk, useUser } from '@clerk/react';
import { storage } from '../config/storage';

const AuthContext = createContext();

const toMongoLikeId = (value = '') => {
  const hex = Array.from(value)
    .map((char) => char.charCodeAt(0).toString(16))
    .join('')
    .replace(/[^a-f0-9]/gi, '')
    .padEnd(24, '0');

  return hex.slice(0, 24);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut, openSignIn, openSignUp } = useClerk();

  const userData = useMemo(() => {
    const storedProfile = storage.getUserData() || {};
    const fullName = clerkUser?.fullName || clerkUser?.firstName || '';
    const email = clerkUser?.primaryEmailAddress?.emailAddress || '';

    return {
      uid: clerkUser?.id || null,
      email,
      name: storedProfile.name || fullName || email.split('@')[0] || 'User',
      phone: storedProfile.phone || '',
      address: storedProfile.address || '',
      profilePicture: storedProfile.profilePicture || clerkUser?.imageUrl || null,
      createdAt: storedProfile.createdAt || clerkUser?.createdAt || new Date().toISOString(),
      updatedAt: storedProfile.updatedAt || new Date().toISOString(),
    };
  }, [clerkUser]);

  const user = clerkUser
    ? {
        id: clerkUser.id,
        _id: toMongoLikeId(clerkUser.id),
        uid: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        name: userData.name,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        imageUrl: clerkUser.imageUrl,
        userData,
      }
    : null;

  const login = async () => {
    await openSignIn();
    return { success: true };
  };

  const signup = async () => {
    await openSignUp();
    return { success: true };
  };

  const updateUserProfile = async (newUserData) => {
    try {
      const updatedUserData = {
        ...storage.getUserData(),
        ...newUserData,
        updatedAt: new Date().toISOString(),
      };

      storage.setUserData(updatedUserData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to update profile' };
    }
  };

  const logout = async () => {
    storage.removeLoginState();
    await signOut();
    return { success: true };
  };

  const value = {
    user,
    userData,
    loading: !isLoaded,
    login,
    signup,
    updateUserProfile,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
