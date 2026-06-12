// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAMmxsDqV1do0zPpgIuxI8ZC9dtlcpR8M",
  authDomain: "techhub-an-e-commerce-business.firebaseapp.com",
  projectId: "techhub-an-e-commerce-business",
  storageBucket: "techhub-an-e-commerce-business.firebasestorage.app",
  messagingSenderId: "1032401626689",
  appId: "1:1032401626689:web:5417e8ef99275f601f48c0",
  measurementId: "G-ST4DMM024C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
nimport { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const auth = getAuth(app);
export const storage = getStorage(app);
