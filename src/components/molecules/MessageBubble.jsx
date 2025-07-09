import React from "react";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

const MessageBubble = ({ message, agentName, agentColor }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn(
      "flex mb-4 message-appear",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
        isUser 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-md" 
          : "bg-gray-100 text-gray-900 rounded-bl-md"
      )}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: agentColor }}
            />
            <span className="text-xs font-medium text-gray-600">{agentName}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        {message.timestamp && (
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {format(message.timestamp.toDate ? message.timestamp.toDate() : new Date(), "HH:mm")}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;