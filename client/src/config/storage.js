// Local Storage Configuration
// Simple local storage utilities for user data management

const STORAGE_KEYS = {
  USER: 'techhub_user',
  USER_DATA: 'techhub_user_data',
  AUTH_TOKEN: 'techhub_auth_token',
  IS_LOGGED_IN: 'techhub_is_logged_in'
};

// Local storage utilities
export const storage = {
  // Save user data to localStorage
  setUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
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

  // Check if user is logged in
  isLoggedIn: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
    } catch (error) {
      console.error('❌ Error checking login state:', error);
      return false;
    }
  },

  // Remove login state only (keep profile data)
  removeLoginState: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      console.log('✅ Login state removed from localStorage (profile data preserved)');
    } catch (error) {
      console.error('❌ Error removing login state:', error);
    }
  },

  // Remove all user data from localStorage
  removeUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      console.log('✅ All user data removed from localStorage');
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
  },

  // Convert image to base64 and save
  saveProfileImage: (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const base64Image = event.target.result;
          const userData = storage.getUserData() || {};
          userData.profilePicture = base64Image;
          storage.setUserData(userData);
          console.log('✅ Profile image saved as base64');
          resolve(base64Image);
        } catch (error) {
          console.error('❌ Error saving profile image:', error);
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }
};
