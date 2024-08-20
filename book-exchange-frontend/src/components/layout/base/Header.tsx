import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import SearchBar from "../../SearchBar";

// eslint-disable-next-line react-hooks/rules-of-hooks
interface MenuList {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Props {
  menuList: MenuList[];
}

const Header = ({ menuList }: Props) => {
  const navigete = useNavigate();
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <div onClick={() => navigete("/")} className="cursor-pointer">
          <img src={Logo} alt="Turnix" className="w-32" />
        </div>
        <SearchBar />

        <div className="flex items-center space-x-4">
          {menuList.map((menu, index) => (
            <a
              key={index}
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center gap-1"
              onClick={() => navigete(menu.url)}
            >
              <div className="text-2xl">{menu.icon}</div>
              <div className="text-xs leading-3">{menu.name}</div>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
