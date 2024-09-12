import { Outlet } from "react-router-dom";
import SidebarAccout from "./SidebarWrapper";
import MobileWrapper from "../MobileWrapper";

function AccountLayout() {
  return (
    <div className=" grid grid-cols-12 gap-6 pt-4 pb-16 items-start ">
      <div className="col-span-3 ">
        <SidebarAccout />
      </div>
      <div className="md:hidden block ">
        <MobileWrapper>
          <SidebarAccout />
        </MobileWrapper>
      </div>
      <div className="col-span-9 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
