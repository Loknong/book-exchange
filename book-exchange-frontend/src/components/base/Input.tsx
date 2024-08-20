import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "success" | "warning" | "danger";
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  shadow = "default",
  variant = "default",
  disabled = false,
}) => {
  const baseStyle = `p-2 rounded w-full transition ease-in-out duration-150 ${shadow === "default" ? "shadow" : `shadow-${shadow}`}`;
  const variantStyle = {
    default: "bg-secondary-muted border-neutral text-text-primary focus:border-primary focus:ring-primary",
    success: "bg-secondary-muted border-success text-success focus:border-success-dark focus:ring-success-dark",
    warning: "bg-secondary-muted border-warning text-warning focus:border-warning-dark focus:ring-warning-dark",
    danger: "bg-secondary-muted border-danger text-danger focus:border-danger-dark focus:ring-danger-dark",
  }[variant];

  const disabledStyle = "bg-neutral-light text-neutral-dark cursor-not-allowed shadow-none";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className={`${baseStyle} ${disabled ? disabledStyle : variantStyle}`}
      disabled={disabled}
    />
  );
};

export default Input;
