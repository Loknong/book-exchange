import React from "react";

interface TooltipProps {
  text: string;
  variant?: "default" | "success" | "warning" | "danger";
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  variant = "default",
  children,
}) => {
  const variantStyle = {
    default: "bg-neutral-dark text-secondary",
    success: "bg-success text-secondary",
    warning: "bg-warning text-neutral-dark",
    danger: "bg-danger text-secondary",
  }[variant];

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 text-sm rounded hidden group-hover:block ${variantStyle}`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
