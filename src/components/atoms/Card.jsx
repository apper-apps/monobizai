import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white border border-gray-200 shadow-lg",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6 transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;