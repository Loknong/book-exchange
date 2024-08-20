import React from "react";
import { IconType } from "react-icons";

interface DropdownItemProps {
  label: string;
  icon: IconType;
  url: string;
  navigate: (url: string) => void;
}

function DropdownItem({ label, icon: Icon, url, navigate }: DropdownItemProps) {
  return (
    <div
      className="flex items-center px-6 py-3 hover:bg-gray-100 transition cursor-pointer"
      onClick={() => navigate(url)}
    >
      <Icon className="text-gray-600" />
      <span className="ml-6 text-gray-600 text-sm">{label}</span>
    </div>
  );
}

export default DropdownItem;
