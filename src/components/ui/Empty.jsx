import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available",
  description = "There's nothing here yet",
  icon = "Inbox",
  action,
  className 
}) => {
  return (
    <Card className={cn("text-center py-12", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={32} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {description}
          </p>
        </div>
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Empty;