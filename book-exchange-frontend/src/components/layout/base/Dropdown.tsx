import DropdownItem from "./DropdownItem";
import { IconType } from "react-icons";

interface DropdownProps {
  items: { label: string; icon: IconType; url: string }[];
  navigate: (url: string) => void;
}

function Dropdown({ items, navigate }: DropdownProps) {
  return (
    <div className="absolute w-full bg-white shadow-md py-3 left-0 top-full divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 duration-300 invisible group-hover:visible">
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          label={item.label}
          icon={item.icon}
          url={item.url}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

export default Dropdown;
