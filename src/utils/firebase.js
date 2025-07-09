import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment
// Firebase configuration using environment variables
const firebaseConfig = window.__firebase_config || {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const required = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = required.filter(key => !firebaseConfig[key]);
  
  if (missing.length > 0) {
    console.error('Missing Firebase configuration:', missing);
    throw new Error(`Missing Firebase environment variables: ${missing.join(', ')}`);
  }
};

// Validate configuration before initializing
validateFirebaseConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication helper
export const authenticateUser = async () => {
  try {
    const initialToken = window.__initial_auth_token;
    
    if (initialToken) {
      await signInWithCustomToken(auth, initialToken);
    } else {
      await signInAnonymously(auth);
    }
    
    return auth.currentUser;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export default app;