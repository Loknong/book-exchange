import React from "react";
import { Outlet, Link } from "react-router-dom";

const UserProfile: React.FC = () => {
  return (

    <div className="flex flex-row my-1 px-2 py-2 bg-yellow-300">
      {/* Side Bar */}
      <div className="max-w-52 w-full flex flex-col ">
        <div className="block h-20 w-full border px-1 py-1">User Profile</div>
        <span className="block h-12 w-full border px-1 py-1 text-sm">
          Dummy Image User If Need
        </span>

        <nav className="px-1">
          <ul className="flex flex-col border-green-500 border justify-center gap-2">
            <li className=" border-blue-500 border">
              <Link to="add-book">Add Book</Link>
            </li>
            <li className=" border-blue-500 border">
              <Link to="inventory">Inventory</Link>
            </li>

            <li className=" border-blue-500 border">
              <Link to="history">Transaction History</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-2  w-full bg-yellow-600 ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
