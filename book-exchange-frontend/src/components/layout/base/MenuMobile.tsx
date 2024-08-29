import { FaTimes } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { useUserStore } from "../../../stores/userStore";
import { MdLogout } from "react-icons/md";

interface Props {
  isVisible: boolean;
  toggleNav: () => void;
  menuList: { name: string; link: string }[];
  navigate: (path: string) => void;
}

const MenuMobile = ({ isVisible, toggleNav, menuList, navigate }: Props) => {
  const userId = useUserStore().userId;
  const clearUser = useUserStore().clearUser;
  return (
    <div
      className={`menu-mobile fixed inset-0 z-50 grid grid-cols-12 transition duration-500 ${
        isVisible ? `opacity-100` : `opacity-0 pointer-events-none`
      }`}
    >
      {/* menu section */}
      <div
        className={`col-span-9 bg-white shadow-sm overflow-y-auto z-50  flex flex-col transition  duration-300 ${
          isVisible ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        {/* Head */}
        <div className="bg-secondary-muted flex flex-col">
          <div className="p-4 space-x-4 flex justify-end items-center text-white">
            <>
              {userId === null ? (
                <div
                  className="flex flex-row space-x-4 items-center cursor-pointer hover:text-primary"
                  onClick={() => navigate("/login")}
                >
                  <span className="text-md">Sign in </span>
                  <FaRegUser className="w-8 text-xl font-semibold" />
                </div>
              ) : (
                <div
                  className="flex flex-row space-x-4 items-center hover:text-primary cursor-pointer"
                  onClick={() => {
                    clearUser();
                    navigate("/");
                  }}
                >
                  <span className="text-md">Logout </span>
                  <MdLogout className="w-8 text-xl font-semibold" />
                </div>
              )}
            </>
          </div>
          <div className="text-white px-4 pb-4">
            <p className="font-semibold text-xl">Browse</p>
            <p className="font-semibold text-2xl  leading-4">TURNiX</p>
          </div>
        </div>

        {/* Sections with divide */}
        <div className="divide-y-4 divide-secondary-light flex flex-col">
          <div className="flex justify-between items-center p-4">
            <span className="text-secondary font-bold text-xl">
              TURNiX Home
            </span>
            <GoHome className="w-6 h-6" />
          </div>

          <div className="p-4">
            <span className="text-secondary font-bold text-xl">Category</span>
            <ul className="mt-2">
              {menuList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.link)}
                  className="text-md text-secondary-light cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* overlay section */}
      <div className="absolute inset-0 z-40" onClick={toggleNav}>
        <div
          className={`bg-black h-full transition-opacity relative duration-300 ${
            isVisible ? `opacity-80` : `hidden`
          }`}
        />
        <button className="absolute z-40 top-7 right-7 -translate-x-1/2">
          <FaTimes className="text-2xl text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default MenuMobile;
