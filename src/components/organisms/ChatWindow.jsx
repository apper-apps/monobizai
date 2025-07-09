import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import MessageBubble from "@/components/molecules/MessageBubble";
import ChatInput from "@/components/molecules/ChatInput";
import LoadingDots from "@/components/molecules/LoadingDots";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ChatWindow = ({
  selectedAgent,
  messages,
  onSendMessage,
  isLoading,
  onSelectAgent,
  className
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  if (!selectedAgent) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        <Empty
          title="Select an AI Agent"
          description="Choose from our specialized team of AI agents to get expert assistance for your business needs."
          icon="Bot"
          action={
            <Button
              variant="primary"
              onClick={() => onSelectAgent(null)}
              className="lg:hidden"
            >
              <ApperIcon name="Users" size={16} className="mr-2" />
              Browse Agents
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Chat Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: selectedAgent.color }}
          >
            <ApperIcon name={selectedAgent.icon} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">
              {selectedAgent.name}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {selectedAgent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: selectedAgent.color }}
              >
                <ApperIcon name={selectedAgent.icon} size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Start a conversation with {selectedAgent.name}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                I'm here to help with {selectedAgent.description.toLowerCase()}. What would you like to know?
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.Id || message.timestamp}
                message={message}
                agentName={selectedAgent.name}
                agentColor={selectedAgent.color}
              />
            ))}
            {isLoading && <LoadingDots />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <ChatInput
          onSendMessage={onSendMessage}
          disabled={isLoading}
          placeholder={`Ask ${selectedAgent.name} anything...`}
        />
      </div>
    </div>
  );
};

export default ChatWindow;