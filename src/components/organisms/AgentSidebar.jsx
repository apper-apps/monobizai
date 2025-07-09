import React from "react";
import { cn } from "@/utils/cn";
import AgentCard from "@/components/molecules/AgentCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const AgentSidebar = ({ 
  agents, 
  selectedAgent, 
  onSelectAgent,
  onClearHistory,
  isOpen,
  onClose,
  className 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:relative lg:transform-none lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                AI Agents
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            {selectedAgent && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearHistory}
                  className="w-full"
                >
                  <ApperIcon name="Trash2" size={16} className="mr-2" />
                  Clear History
                </Button>
              </div>
            )}
          </div>

          {/* Agent List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.Id}
                  agent={agent}
                  isSelected={selectedAgent?.Id === agent.Id}
                  onClick={onSelectAgent}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentSidebar;