import React from "react";

interface BadgeProps {
  text: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "primary",
  className,
}) => {
  const variantStyle = {
    primary: "bg-primary text-secondary",
    secondary: "bg-neutral text-secondary",
    success: "bg-success text-secondary",
    warning: "bg-warning text-neutral-dark",
    danger: "bg-danger text-secondary",
  }[variant];

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-sm ${variantStyle} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
