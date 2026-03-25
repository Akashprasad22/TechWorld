// Local Storage Configuration
// Simple local storage utilities for user data management

const STORAGE_KEYS = {
  USER: 'techhub_user',
  USER_DATA: 'techhub_user_data',
  AUTH_TOKEN: 'techhub_auth_token'
};

// Local storage utilities
export const storage = {
  // Save user data to localStorage
  setUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      console.log('✅ User saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving user to localStorage:', error);
    }
  },

  // Get user data from localStorage
  getUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('❌ Error getting user from localStorage:', error);
      return null;
    }
  },

  // Remove user data from localStorage
  removeUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      console.log('✅ User removed from localStorage');
    } catch (error) {
      console.error('❌ Error removing user from localStorage:', error);
    }
  },

  // Save user profile data
  setUserData: (userData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      console.log('✅ User data saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving user data to localStorage:', error);
    }
  },

  // Get user profile data
  getUserData: () => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('❌ Error getting user data from localStorage:', error);
      return null;
    }
  }
};
