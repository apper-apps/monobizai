import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong",
  onRetry,
  className 
}) => {
  return (
    <Card className={cn("text-center py-8", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {message}
          </p>
        </div>
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            className="mt-4"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;