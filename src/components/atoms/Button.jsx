import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  disabled,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed hover:transform-none",
        !disabled && "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;