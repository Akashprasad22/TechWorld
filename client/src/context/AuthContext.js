import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, validateFirebaseConfig } from '../config/firebase';

let app;
let auth;
let db;

// Validate Firebase configuration before initialization
if (!validateFirebaseConfig()) {
  console.error('🚨 Firebase configuration is invalid. Please fix the config values in src/config/firebase.js');
  // Don't initialize Firebase with invalid config
} else {
  try {
    console.log('🔥 Initializing Firebase with validated config...');
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', firebaseConfig.projectId);
    console.log('🔧 Auth Domain:', firebaseConfig.authDomain);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.error('📋 Error details:', error.code, error.message);
    console.error('🔧 Please check your Firebase configuration in src/config/firebase.js');
  }
}

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

  useEffect(() => {
    console.log('Setting up auth listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser);
      
      if (firebaseUser) {
        console.log('User is authenticated:', firebaseUser.uid);
        setUser(firebaseUser);
        
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('User data found:', data);
            setUserData(data);
          } else {
            console.log('No user data found, creating default profile...');
            // Create default user profile
            const defaultUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'User',
              phone: '',
              address: '',
              profilePicture: firebaseUser.photoURL || null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), defaultUserData);
            setUserData(defaultUserData);
            console.log('Default user profile created:', defaultUserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Set minimal user data even if Firestore fails
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'User',
            phone: '',
            address: '',
            profilePicture: firebaseUser.photoURL || null
          });
        }
      } else {
        console.log('No authenticated user');
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth listener...');
      unsubscribe();
    };
  }, []);

  const updateUserProfile = async (profileData) => {
    console.log('Updating user profile:', profileData);
    
    if (!user) {
      console.error('No authenticated user for profile update');
      throw new Error('No authenticated user');
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const updatedData = {
        ...profileData,
        uid: user.uid,
        updatedAt: new Date().toISOString()
      };

      await setDoc(userRef, updatedData, { merge: true });
      setUserData(updatedData);
      
      console.log('Profile updated successfully:', updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('Logging out user...');
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    updateUserProfile,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
