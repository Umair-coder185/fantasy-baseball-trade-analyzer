import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-gradient-to-r from-primary-blue to-[#4f46e5] text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-primary-blue shadow-md hover:shadow-lg transition-all duration-300",
      secondary: "bg-white text-main-text border border-border-color hover:bg-gray-50 focus:ring-primary-blue shadow-sm hover:shadow transition-all duration-300",
      danger: "bg-gradient-to-r from-negative-red to-[#b91c1c] text-white hover:from-red-700 hover:to-red-800 focus:ring-negative-red shadow-md hover:shadow-lg transition-all duration-300",
      ghost: "bg-transparent text-main-text hover:bg-gray-100 focus:ring-gray-200 transition-all duration-300",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-11 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
