import React from "react";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface SidebarFilterProps {
  title: string;
  options: FilterOption[];
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ title, options }) => {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <label htmlFor={option.id} className="ml-3 text-gray-600 cursor-pointer">
              {option.label}
            </label>
            <div className="ml-auto text-gray-600 text-sm">({option.count})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
