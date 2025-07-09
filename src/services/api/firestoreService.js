import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/utils/firebase";

export const firestoreService = {
  // Chat history operations
  async saveChatMessage(userId, agentType, message) {
    try {
      const chatRef = collection(db, `artifacts/bizai-hub/users/${userId}/agentChats`);
      
      const messageData = {
        agentType,
        sender: message.sender,
        text: message.text,
        timestamp: serverTimestamp(),
        created: serverTimestamp()
      };
      
      const docRef = await addDoc(chatRef, messageData);
      return { Id: docRef.id, ...messageData };
    } catch (error) {
      console.error("Error saving chat message:", error);
      throw new Error("Failed to save message");
    }
  },
  
  async getChatHistory(userId, agentType) {
    try {
      const chatRef = collection(db, `artifacts/bizai-hub/users/${userId}/agentChats`);
      const q = query(
        chatRef,
        where("agentType", "==", agentType),
        orderBy("timestamp", "asc"),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      
      querySnapshot.forEach((doc) => {
        messages.push({
          Id: doc.id,
          ...doc.data()
        });
      });
      
      return messages;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw new Error("Failed to load chat history");
    }
  },
  
  async clearChatHistory(userId, agentType) {
    try {
      const chatRef = collection(db, `artifacts/bizai-hub/users/${userId}/agentChats`);
      const q = query(chatRef, where("agentType", "==", agentType));
      
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      
      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      console.error("Error clearing chat history:", error);
      throw new Error("Failed to clear chat history");
    }
  },
  
  // User preferences operations
  async saveUserPreferences(userId, preferences) {
    try {
      const userRef = doc(db, `artifacts/bizai-hub/users/${userId}`);
      await updateDoc(userRef, {
        preferences,
        lastUpdated: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error saving user preferences:", error);
      throw new Error("Failed to save preferences");
    }
  }
};