import React from "react";

interface SelectLimitProps {
  viewLimit: number;
  onViewLimitChange: (limit: number) => void;
}

const SelectLimit: React.FC<SelectLimitProps> = ({ viewLimit, onViewLimitChange }) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onViewLimitChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center mb-4">
      <select
        className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
        onChange={handleLimitChange}
        value={viewLimit}
      >
        <option value={5}>Show 5</option>
        <option value={10}>Show 10</option>
        <option value={20}>Show 20</option>
      </select>
    </div>
  );
};

export default SelectLimit;
