import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
}) => {
  const baseStyle = "px-4 py-2 rounded";
  const variantStyle =
    variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
