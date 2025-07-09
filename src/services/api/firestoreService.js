import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/utils/firebase';

class FirestoreService {
  constructor() {
    this.db = db;
    this.messagesCollection = 'chatMessages';
    this.usersCollection = 'users';
  }

  /**
   * Load chat history for a specific agent type and user
   * @param {string} agentType - The type of agent (e.g., 'marketing', 'sales')
   * @param {string} userId - The user's ID
   * @returns {Promise<Array>} Array of chat messages
   */
  async loadChatHistory(agentType, userId) {
    try {
      if (!agentType || !userId) {
        throw new Error('Agent type and user ID are required');
      }

      const messagesRef = collection(this.db, this.messagesCollection);
      const q = query(
        messagesRef,
        where('agentType', '==', agentType),
        where('userId', '==', userId),
        orderBy('timestamp', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        });
      });

      return messages;
    } catch (error) {
      console.error('Error loading chat history:', error);
      throw new Error(`Failed to load chat history: ${error.message}`);
    }
  }

  /**
   * Save a chat message to Firestore
   * @param {Object} message - The message object
   * @returns {Promise<string>} The document ID of the saved message
   */
  async saveChatMessage(message) {
    try {
      const { id, ...messageData } = message;
      
      const messageToSave = {
        ...messageData,
        timestamp: serverTimestamp(),
        createdAt: new Date()
      };

      const messagesRef = collection(this.db, this.messagesCollection);
      const docRef = await addDoc(messagesRef, messageToSave);
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw new Error(`Failed to save message: ${error.message}`);
    }
  }

  /**
   * Clear chat history for a specific agent type and user
   * @param {string} agentType - The type of agent
   * @param {string} userId - The user's ID
   * @returns {Promise<void>}
   */
  async clearChatHistory(agentType, userId) {
    try {
      if (!agentType || !userId) {
        throw new Error('Agent type and user ID are required');
      }

      const messagesRef = collection(this.db, this.messagesCollection);
      const q = query(
        messagesRef,
        where('agentType', '==', agentType),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return; // No messages to delete
      }

      const batch = writeBatch(this.db);
      
      querySnapshot.forEach((document) => {
        batch.delete(doc(this.db, this.messagesCollection, document.id));
      });

      await batch.commit();
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw new Error(`Failed to clear chat history: ${error.message}`);
    }
  }

  /**
   * Get all chat history for a user across all agents
   * @param {string} userId - The user's ID
   * @returns {Promise<Array>} Array of chat messages
   */
  async getUserChatHistory(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const messagesRef = collection(this.db, this.messagesCollection);
      const q = query(
        messagesRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        });
      });

      return messages;
    } catch (error) {
      console.error('Error getting user chat history:', error);
      throw new Error(`Failed to get user chat history: ${error.message}`);
    }
  }

  /**
   * Save multiple chat messages in a batch
   * @param {Array} messages - Array of message objects
   * @returns {Promise<void>}
   */
  async saveChatMessages(messages) {
    try {
      if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('Messages array is required');
      }

      const batch = writeBatch(this.db);
      const messagesRef = collection(this.db, this.messagesCollection);

      messages.forEach((message) => {
        const { id, ...messageData } = message;
        const messageToSave = {
          ...messageData,
          timestamp: serverTimestamp(),
          createdAt: new Date()
        };
        
        const docRef = doc(messagesRef);
        batch.set(docRef, messageToSave);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error saving chat messages:', error);
      throw new Error(`Failed to save messages: ${error.message}`);
    }
  }

  /**
   * Get chat statistics for a user
   * @param {string} userId - The user's ID
   * @returns {Promise<Object>} Chat statistics
   */
  async getChatStatistics(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const messagesRef = collection(this.db, this.messagesCollection);
      const q = query(messagesRef, where('userId', '==', userId));

      const querySnapshot = await getDocs(q);
      const stats = {
        totalMessages: 0,
        agentTypes: {},
        lastActivity: null
      };

      let latestTimestamp = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.totalMessages++;
        
        if (data.agentType) {
          stats.agentTypes[data.agentType] = (stats.agentTypes[data.agentType] || 0) + 1;
        }

        const timestamp = data.timestamp?.toDate() || data.createdAt;
        if (timestamp && (!latestTimestamp || timestamp > latestTimestamp)) {
          latestTimestamp = timestamp;
        }
      });

      stats.lastActivity = latestTimestamp;
      
      return stats;
    } catch (error) {
      console.error('Error getting chat statistics:', error);
      throw new Error(`Failed to get chat statistics: ${error.message}`);
    }
  }
}

// Create and export service instance
export const firestoreService = new FirestoreService();
export default firestoreService;