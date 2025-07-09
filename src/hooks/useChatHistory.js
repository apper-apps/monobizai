import { useState, useEffect } from "react";
import { firestoreService } from "@/services/api/firestoreService";

export const useChatHistory = (user, agentType) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    if (!user || !agentType) return;

    setLoading(true);
    setError(null);

    try {
      const history = await firestoreService.getChatHistory(user.uid, agentType);
      setMessages(history);
    } catch (error) {
      console.error("Error loading chat history:", error);
      setError("Failed to load chat history");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (message) => {
    if (!user || !agentType) return;

    try {
      await firestoreService.saveChatMessage(user.uid, agentType, message);
      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  };

  const clearHistory = async () => {
    if (!user || !agentType) return;

    try {
      await firestoreService.clearChatHistory(user.uid, agentType);
      setMessages([]);
    } catch (error) {
      console.error("Error clearing history:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadHistory();
  }, [user, agentType]);

  return {
    messages,
    loading,
    error,
    addMessage,
    clearHistory,
    reload: loadHistory
  };
};