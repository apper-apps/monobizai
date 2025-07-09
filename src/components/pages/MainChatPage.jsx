import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import AgentSidebar from "@/components/organisms/AgentSidebar";
import ChatWindow from "@/components/organisms/ChatWindow";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { authenticateUser } from "@/utils/firebase";
import { geminiService } from "@/services/api/geminiService";
import { firestoreService } from "@/services/api/firestoreService";
import agentsData from "@/services/mockData/agentsData.json";

const MainChatPage = () => {
  // Authentication state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // App state
  const [agents] = useState(agentsData);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Chat state
  const [chatHistory, setChatHistory] = useState({});

  // Initialize authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        setAuthError(null);
        const authenticatedUser = await authenticateUser();
        setUser(authenticatedUser);
        console.log("User authenticated:", authenticatedUser.uid);
      } catch (error) {
        console.error("Authentication failed:", error);
        setAuthError("Failed to authenticate. Please refresh the page.");
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  // Load chat history when agent is selected
  useEffect(() => {
    if (selectedAgent && user) {
      loadChatHistory(selectedAgent.type);
    }
  }, [selectedAgent, user]);

  const loadChatHistory = async (agentType) => {
    if (!user) return;

    try {
      // Check if we have cached history
      if (chatHistory[agentType]) {
        setMessages(chatHistory[agentType]);
        return;
      }

      // Load from Firestore
      const history = await firestoreService.getChatHistory(user.uid, agentType);
      
      // Update both state and cache
      setMessages(history);
      setChatHistory(prev => ({
        ...prev,
        [agentType]: history
      }));
    } catch (error) {
      console.error("Error loading chat history:", error);
      setMessages([]);
    }
  };

  const handleSelectAgent = (agent) => {
    setSelectedAgent(agent);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedAgent || !user || !messageText.trim()) return;

    const userMessage = {
      Id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date(),
      agentType: selectedAgent.type
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Save user message to Firestore
      await firestoreService.saveChatMessage(user.uid, selectedAgent.type, userMessage);

      // Get AI response
      const currentHistory = messages.concat(userMessage);
      const aiResponse = await geminiService.generateResponse(
        messageText,
        selectedAgent.systemPrompt,
        currentHistory
      );

      const agentMessage = {
        Id: (Date.now() + 1).toString(),
        sender: "agent",
        text: aiResponse,
        timestamp: new Date(),
        agentType: selectedAgent.type
      };

      // Add agent message
      setMessages(prev => [...prev, agentMessage]);

      // Save agent message to Firestore
      await firestoreService.saveChatMessage(user.uid, selectedAgent.type, agentMessage);

      // Update cache
      const updatedHistory = [...currentHistory, agentMessage];
      setChatHistory(prev => ({
        ...prev,
        [selectedAgent.type]: updatedHistory
      }));

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!selectedAgent || !user) return;

    try {
      await firestoreService.clearChatHistory(user.uid, selectedAgent.type);
      setMessages([]);
      setChatHistory(prev => ({
        ...prev,
        [selectedAgent.type]: []
      }));
      toast.success("Chat history cleared successfully");
    } catch (error) {
      console.error("Error clearing history:", error);
      toast.error("Failed to clear history. Please try again.");
    }
  };

  const handleRetryAuth = () => {
    setAuthLoading(true);
    setAuthError(null);
    // Trigger re-authentication
    window.location.reload();
  };

  // Show loading state during authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Show error state if authentication failed
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Error 
          message={authError}
          onRetry={handleRetryAuth}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header 
        user={user}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Agent Sidebar */}
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onSelectAgent={handleSelectAgent}
          onClearHistory={handleClearHistory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow
            selectedAgent={selectedAgent}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onSelectAgent={() => setSidebarOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default MainChatPage;