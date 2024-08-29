import React, { useState } from "react";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface SidebarFilterProps {
  title: string;
  options: FilterOption[];
  selectedGenres: (genres: string[]) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  title,
  options,
  selectedGenres,
}) => {
  const [, setGenres] = useState<string[]>([]);
  const handleGenreChange = (genre: string, checked: boolean) => {
    setGenres((prevGenres) => {
      const newGenres = checked
        ? [...prevGenres, genre]
        : prevGenres.filter((g) => g !== genre);
      selectedGenres(newGenres);
      return newGenres;
    });
  };

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
              onChange={(e) =>
                handleGenreChange(option.label, e.target.checked)
              }
            />
            <label
              htmlFor={option.id}
              className="ml-3 text-gray-600 cursor-pointer"
            >
              {option.label}
            </label>
            <div className="ml-auto text-gray-600 text-sm">
              ({option.count})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
