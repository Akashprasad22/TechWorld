// Firebase Configuration
// Get these values from Firebase Console → Project Settings → General → Web App → SDK config

const firebaseConfig = {
  // Replace with your actual Firebase API key
  apiKey: "AIzaSy...your-actual-api-key-here",
  
  // Replace with your project ID (from Firebase Console)
  authDomain: "your-project-id.firebaseapp.com",
  
  // Replace with your project ID
  projectId: "your-project-id",
  
  // Replace with your project ID + .appspot.com
  storageBucket: "your-project-id.appspot.com",
  
  // Replace with your sender ID (from Firebase Console → Project Settings → Cloud Messaging)
  messagingSenderId: "123456789012",
  
  // Replace with your app ID (from Firebase Console → Project Settings → General)
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Validate configuration before initialization
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field] || firebaseConfig[field].includes('your-'));
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase Configuration Error:');
    console.error('Missing or invalid fields:', missingFields);
    console.error('\n📋 To fix this error:');
    console.error('1. Go to Firebase Console: https://console.firebase.google.com');
    console.error('2. Select your project');
    console.error('3. Go to Project Settings → General');
    console.error('4. Scroll down to "Your apps" section');
    console.error('5. Click on your web app');
    console.error('6. Copy the Firebase SDK configuration');
    console.error('7. Replace the placeholder values in this file');
    
    return false;
  }
  
  console.log('✅ Firebase configuration is valid');
  return true;
};

export { firebaseConfig, validateFirebaseConfig };
