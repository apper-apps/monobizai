import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const ChatInput = ({ 
  onSendMessage, 
  disabled, 
  placeholder = "Type your message...",
  className 
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex space-x-2", className)}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="chat-input flex-1"
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="px-4 py-2 flex-shrink-0"
      >
        <ApperIcon name="Send" size={16} />
      </Button>
    </form>
  );
};

export default ChatInput;