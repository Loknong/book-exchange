import React from "react";
import CategoriesDropdown from "./CategoryDropdown";
import NavLink from "./NavLink";
import { IconType } from "react-icons";

interface DropdownItem {
  label: string;
  icon: IconType;
  url: string;
}

interface NavLinkProps {
  label: string;
  url: string;
}

interface NavbarProps {
  dropdownItems: DropdownItem[];
  navLinks: NavLinkProps[];
  navigate: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  dropdownItems,
  navLinks,
  navigate,
}) => {
  return (
    <nav className="bg-secondary-muted ">
      <div className="container flex">
        <CategoriesDropdown items={dropdownItems} navigate={navigate} />

        <div className="flex items-center justify-between flex-grow pl-0 md:pl-12 ">
          <div className="flex items-center space-x-6 whitespace-nowrap">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                label={link.label}
                url={link.url}
                navigate={navigate}
              />
            ))}
          </div>
          
          <div
            className="text-gray-200 hover:text-white transition cursor-pointer md:ml-0 ml-6"
            onClick={() => navigate("/login")}
          >
            Login/Register
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// hidden md:flex
