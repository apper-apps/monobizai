import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment
const firebaseConfig = window.__firebase_config || {
  apiKey: "demo-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

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