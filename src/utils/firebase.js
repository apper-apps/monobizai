// Simulated user authentication for development
// Replaces Firebase authentication with local user simulation

const generateUserId = () => {
  let userId = localStorage.getItem('simulated_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('simulated_user_id', userId);
  }
  return userId;
};

const createSimulatedUser = () => {
  const userId = generateUserId();
  return {
    uid: userId,
    email: `${userId}@example.com`,
    displayName: 'Demo User',
    isAnonymous: false,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
};

// Authentication helper - now returns simulated user
export const authenticateUser = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = createSimulatedUser();
    console.log("Simulated user authenticated:", user.uid);
    
    return user;
  } catch (error) {
    console.error("Simulated authentication error:", error);
    throw error;
  }
};

// Export simulated user for compatibility
export const auth = {
  currentUser: null
};

export const db = null; // No longer used

export default null;