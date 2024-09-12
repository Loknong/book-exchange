import { IconType } from "react-icons";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItem {
  label: string;
  path: string;
  icon: IconType;
}

interface SidebarMenuProps {
  items: SidebarItem[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="space-y-1 pl-8 pt-4">
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <span
            key={index}
            className={`relative block font-medium capitalize  transition cursor-pointer ${isActive ? "text-primary" : "hover:text-primary"
              }`}
            onClick={() => navigate(item.path)}
          >
            <span className="absolute -left-8 top-1 text-base">
              <item.icon className={`text-base ${isActive ? "text-primary" : "hover:text-primary"}`} />
            </span>
            {item.label}
          </span>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
