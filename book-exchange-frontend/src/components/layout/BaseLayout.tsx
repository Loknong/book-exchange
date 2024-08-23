import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

import { Outlet } from "react-router-dom";
import BookLogo from "../../assets/react.svg";

export default function ShelfLayout() {
  const [isMenuExpanded, setIsMenuExpaned] = useState<boolean>(false);

  const CloseOutlineClass = isMenuExpanded ? "block" : "hidden";
  const HamburgerMenuClass = isMenuExpanded ? "hidden" : "block";

  // const ProfileMenuMobile = isMenuExpanded ? "block" : "hidden";

  return (
    <div className="bg-slate-200 h-full flex flex-col text-white">
      <header className="h-[64px] bg-slate-400 border border-slate-500 shadow-lg flex flex-row justify-between px-[5%] py-4 items-center">
        <div className="flex flex-row gap-2 items-center">
          <img src={BookLogo} alt="" className="w-[40px]" />
          <span>Book Exhcnage</span>
        </div>
        <ul className=" md:flex md:flex-row gap-4 hidden">
          <li>User: Jukkapan</li>
          <li>Notification</li>
          <li>Setting</li>
        </ul>
        <div
          className="md:hidden block cursor-pointer"
          onClick={() => {
            setIsMenuExpaned(!isMenuExpanded);
          }}
        >
          <RxHamburgerMenu size={30} className={HamburgerMenuClass} />
          <IoCloseOutline size={30} className={CloseOutlineClass} />
        </div>
      </header>
      <div
        className={`bg-slate-300 absolute top-[7%] right-2 p-4 transition-all duration-300 w-full${
          isMenuExpanded ? "h-auto max-h-60 opacity-100" : "h-0 max-h-0 opacity-0"
        }`}
        style={{ width: "200px" }}
      >
        <ul className="flex flex-col items-start px-4 space-y-2">
          <li>User: Jukkapan</li>
          <li>Notification</li>
          <li>Setting</li>
        </ul>
      </div>
      <div className="h-[60px] bg-slate-300 border border-slate-400 shadow-lg flex flex-row ">
        Navigation Bar
      </div>

      <div className="flex flex-col lg:flex-row mx-auto w-full px-[5%] ">
        <aside className="w-[250px] border-slate-500 shadow-md p-4 bg-slate-400 hidden lg:block">
          Aside
        </aside>
        <aside className=" border-slate-500 shadow-md p-4 bg-slate-400 lg:hidden">
          Mobile Aside
        </aside>
        <main className="bg-slate-300 p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <footer className="w-full bg-slate-400 border-t border-slate-500 shadow-md h-[50px] flex justify-center items-center">
        Footer
      </footer>
    </div>
  );
}
