import React from "react";
import Dropdown from "./Dropdown";
import { FaBars } from "react-icons/fa";
import { IconType } from "react-icons";

interface CategoriesDropdownProps {
  items: { label: string; icon: IconType; url: string }[];
  navigate: (url: string) => void;
}

function CategoryDropdown({ items, navigate }: CategoriesDropdownProps) {
  return (
    <div className=" px-8 py-6 bg-primary hidden md:flex items-center cursor-pointer relative group">
      <FaBars className="text-white" />
      <span className="capitalize ml-2 text-white">All Categories</span>
      <Dropdown items={items} navigate={navigate} />
    </div>
  );
}
export default CategoryDropdown;
