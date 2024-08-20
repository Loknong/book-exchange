import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  disabled = false,
  shadow = "default",
  onClick,
  children,
  className,
}) => {
  const baseStyle = `px-4 py-2 rounded transition ease-in-out duration-150 ${shadow === "default" ? "shadow" : `shadow-${shadow}`}`;
  const variantStyle = {
    primary: "bg-primary text-secondary hover:bg-primary-dark",
    secondary: "bg-neutral text-secondary hover:bg-neutral-dark",
    success: "bg-success text-secondary hover:bg-success-dark",
    warning: "bg-warning text-neutral-dark hover:bg-warning-dark",
    danger: "bg-danger text-secondary hover:bg-danger-dark",
  }[variant];

  const disabledStyle = "bg-neutral-light text-neutral-dark cursor-not-allowed shadow-none";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${disabled ? disabledStyle : variantStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
