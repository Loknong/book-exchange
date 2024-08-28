import Header from "./base/Header";
import { useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import Navbar from "./base/Navbar";
import { menuList, dropdownItems, navLinks } from "../../utils/mock/LayoutMock";
import Breadcrumb from "./base/Breadcrumb";
import Footer from "./base/Footer";
import { useEffect, useState } from "react";
import MenuMobile from "./base/MenuMobile";
import { useSwipeable } from "react-swipeable";

const navList = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];
const MainLayout2 = () => {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleNavigation = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  useEffect(() => {
    if (isNavExpanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isNavExpanded]);

  // Handlers for swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsNavExpanded(false),
    onSwipedRight: () => setIsNavExpanded(true),
    trackMouse: true, // to also allow swiping with the mouse
  });

  return (
    <div className="flex flex-col min-h-screen relative" {...handlers}>
      <div className="fixed w-full top-0 left-0 z-50">
        <Header menuList={menuList} toggleNav={toggleNavigation} />
      </div>
      ƒ
      <MenuMobile
        navigate={navigate}
        menuList={navList}
        isVisible={isNavExpanded}
        toggleNav={toggleNavigation}
      />
      <div className="md:mt-[82px] mt-[71px] z-40 md:overflow-x-visible overflow-x-auto bg-secondary-muted md:py-0 py-2">
        <Navbar
          dropdownItems={dropdownItems}
          navLinks={navLinks}
          navigate={navigate}
        />
      </div>
      <Breadcrumb />
      {/* main content */}
      <div className="container min-h-[30vh]">
        <Outlet />
      </div>
      {/* back to top button */}
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
