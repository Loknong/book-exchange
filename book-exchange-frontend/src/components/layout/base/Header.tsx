import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import SearchBar from "../../SearchBar";
import { FaEllipsisV } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import SearchMobile from "../../SearchMobile";

// eslint-disable-next-line react-hooks/rules-of-hooks
interface MenuList {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Props {
  menuList: MenuList[];
  toggleNav: () => void;
}

const Header = ({ menuList, toggleNav }: Props) => {
  const navigete = useNavigate();
  const [userMenu, setUserMenu] = useState<boolean>(false);
  return (
    <header className="md:mx-0  py-4 shadow-sm bg-white">
      <div className="md:container  flex items-center justify-between">
        <div className="flex items-center">
          <RxHamburgerMenu
            className="text-secondary-muted w-9 h-9 block md:hidden ml-2 pt-2"
            onClick={() => toggleNav()}
          />
          <div
            onClick={() => navigete("/")}
            className="cursor-pointer md:mx-0 mx-4"
          >
            <img src={Logo} alt="Turnix" className="h-8 w-auto" />
          </div>
        </div>

        <div className="md:block hidden">
          <SearchBar handleClose={() => {}} onSearch={() => {}} />
        </div>

        {/* header menu list desktop view */}
        <div className=" items-center space-x-4 hidden md:flex">
          {menuList.map((menu, index) => (
            <a
              key={index}
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center gap-1"
              onClick={() => navigete(menu.url)}
            >
              <div className="text-2xl relative">
                {menu.icon}
                <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex justify-center items-center text-white text-xs bg-primary">5</span>
              </div>
              <div className="text-xs leading-3">{menu.name}</div>
            </a>
          ))}
        </div> 

        {/* mobile emote group */}
        <div className="flex flex-row items-center gap-4 md:hidden ">
          <div className="flex flex-row items-center gap-2 md:hidden">
            <SearchMobile />
          </div>
          {/* <div
            className={`${
              isSearchActive ? `top-0 left-0 w-full` : `top-0 left-[100%] w-0`
            }   absolute  bg-primary min-h-screen whitespace-nowrap transition-all duration-300 z-50 p-4`}
          >
            <div className="flex justify-between items-center">
              <i
                className="text-xl"
                onClick={() => setIsSearchActive(!isSearchActive)}
              >
                <FaChevronRight />
              </i>

              <SearchBar />
            </div>
          </div> */}
          {/* notification */}
          <div className="">
            <IoMdNotificationsOutline className="text-xl" />
          </div>

          {/* header menu list mobile view */}
          <div className="relative mr-3">
            <div
              onClick={() => setUserMenu(!userMenu)}
              className={`${
                userMenu && `bg-gray-300`
              }  w-4 h-4 rounded-full absolute opacity-50 -top-3 -right-3`}
            ></div>

            <div
              onClick={() => setUserMenu(!userMenu)}
              className="z-100 cursor-pointer"
            >
              <FaEllipsisV />
            </div>

            {userMenu && (
              <div className="flex flex-col w-[230px] absolute right-2 top-8 md:hidden bg-white z-50 divide-y divide-gray-300 border border-gray-100 rounded shadow-md">
                {menuList.map((menu, index) => (
                  <a
                    key={index}
                    href="#"
                    className=" text-gray-700 hover:text-primary hover:bg-gray-50 transition relative flex items-center gap-5 p-5"
                    onClick={() => navigete(menu.url)}
                  >
                    <div className="text-2xl">{menu.icon}</div>
                    <div className="text-xs leading-3">{menu.name}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
