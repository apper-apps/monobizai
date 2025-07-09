import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const AgentCard = ({ 
  agent, 
  isSelected, 
  onClick,
  className 
}) => {
  return (
    <Card
      variant="elevated"
      className={cn(
        "agent-card cursor-pointer transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-primary-500 bg-primary-50",
        className
      )}
      onClick={() => onClick(agent)}
    >
      <div className="flex items-start space-x-3">
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
          style={{ backgroundColor: agent.color }}
        >
          <ApperIcon name={agent.icon} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {agent.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {agent.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;