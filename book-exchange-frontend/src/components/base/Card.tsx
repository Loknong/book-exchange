import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "danger";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  variant = "default",
  shadow = "default",
  children,
  footer,
  className,
}) => {
  const variantStyle = {
    default: "bg-surface text-text-primary border-neutral-light",
    success: "bg-success text-secondary border-success-dark",
    warning: "bg-warning text-neutral-dark border-warning-dark",
    danger: "bg-danger text-secondary border-danger-dark",
  }[variant];

  return (
    <div
      className={`p-6 rounded-lg border ${
        shadow === "default" ? "shadow" : `shadow-${shadow}`
      } ${variantStyle} ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        {subtitle && <p className="text-text-secondary">{subtitle}</p>}
      </div>
      <div className="mb-4">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default Card;
