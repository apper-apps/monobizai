import React from "react";
import { cn } from "@/utils/cn";

const LoadingDots = ({ className }) => {
  return (
    <div className={cn("flex justify-start mb-4", className)}>
      <div className="max-w-[80%] bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;