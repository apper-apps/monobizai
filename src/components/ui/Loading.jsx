import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Agent selection skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chat messages skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={cn(
            "flex",
            i % 2 === 0 ? "justify-start" : "justify-end"
          )}>
            <div className={cn(
              "max-w-[80%] px-4 py-3 rounded-2xl animate-pulse",
              i % 2 === 0 ? "bg-gray-200" : "bg-primary-200"
            )}>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;