import Header from "./base/Header";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import Navbar from "./base/Navbar";
import { menuList, dropdownItems, navLinks } from "../../utils/mock/LayoutMock";
import Breadcrumb from "./base/Breadcrumb";
import Footer from "./base/Footer";
import { useState } from "react";

const MainLayout2 = () => {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const navigate = useNavigate();
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleNavigation = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full top-0 left-0 z-50">
        <Header menuList={menuList} toggleNav={toggleNavigation} />
      </div>

      <div className="md:mt-[82px] mt-[71px] z-40 md:overflow-x-visible overflow-x-auto bg-secondary-muted md:py-0 py-2">
        <Navbar
          dropdownItems={dropdownItems}
          navLinks={navLinks}
          navigate={navigate}
        />
      </div>

      <Breadcrumb />
      <div className="container min-h-[30vh]">
        <Outlet />
      </div>
      <button
        className="rounded-full shadow-lg fixed bottom-10 right-10 bg-primary text-white p-2"
        onClick={backToTop}
      >
        <span className="md:hidden block">
          <FaChevronUp />
        </span>
        <span className="md:block hidden">Back to Top</span>
      </button>
      <Footer />
    </div>
  );
};

export default MainLayout2;
