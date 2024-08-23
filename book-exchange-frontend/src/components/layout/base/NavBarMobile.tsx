import React from "react";
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
  navLinks,
  navigate,
}) => {
  return (
    <nav className="bg-secondary-muted absolute top-0 z-55 w-[200px] min-h-screen">
      <div className="container flex flex-col">
        {/* <CategoriesDropdown items={dropdownItems} navigate={navigate} /> */}

        <div className="items-center justify-between flex-grow pl-12 ">
          <div className="flex flex-col items-center space-x-6">
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
            className="text-gray-200 hover:text-white transition cursor-pointer"
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
