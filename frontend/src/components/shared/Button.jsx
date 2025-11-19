import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-green-600 hover:bg-green-700 text-white",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeStyles = {
    sm: "text-xs py-1 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const buttonStyles = ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className};

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;