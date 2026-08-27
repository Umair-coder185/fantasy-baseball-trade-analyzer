import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-light-green text-ballpark-green",
    warning: "bg-yellow-100 text-amber",
    danger: "bg-red-100 text-negative-red",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
