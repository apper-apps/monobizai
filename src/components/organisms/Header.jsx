import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  user, 
  onToggleSidebar,
  className 
}) => {
  return (
    <header className={cn(
      "flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Bot" size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                BizAI Hub
              </h1>
              <p className="text-xs text-gray-600">Your AI Business Team</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Business Owner
              </p>
              <p className="text-xs text-gray-600">
                ID: {user.uid.substring(0, 8)}...
              </p>
            </div>
          )}
          
          <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;