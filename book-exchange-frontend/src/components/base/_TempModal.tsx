import React from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  variant?: "default" | "success" | "warning" | "danger";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  variant = "default",
  shadow = "default",
  children,
}) => {
  if (!isOpen) return null;

  const variantStyle = {
    default: "bg-surface text-text-primary",
    success: "bg-success text-secondary",
    warning: "bg-warning text-neutral-dark",
    danger: "bg-danger text-secondary",
  }[variant];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`p-6 rounded-lg w-full max-w-md ${shadow === "default" ? "shadow" : `shadow-${shadow}`} ${variantStyle}`}>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-primary">
            &#10005; {/* X icon */}
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
