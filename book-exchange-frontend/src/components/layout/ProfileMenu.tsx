import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoCloseOutline size={30} />
        ) : (
          <RxHamburgerMenu size={30} />
        )}
      </div>
      
      <div
        className={`absolute right-0 mt-2 bg-white text-black border rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "h-auto max-h-60 opacity-100" : "h-0 max-h-0 opacity-0"
        }`}
        style={{ width: "200px" }}
      >
        <ul className="flex flex-col items-start p-4 space-y-2">
          <li>User: Jukkapan</li>
          <li>Notification</li>
          <li>Setting</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
