import {
  FaBook,
  FaSyncAlt,
  FaUser,
  FaGraduationCap,
  FaGlobe,
  FaPaintBrush,
  FaCode,
} from "react-icons/fa";

export const dropdownItems = [
  { label: "Fiction", icon: FaBook, url: "/fiction" },
  { label: "Educational", icon: FaGraduationCap, url: "/educational" },
  { label: "Non-Fiction", icon: FaGlobe, url: "/non-fiction" },
  { label: "Art & Design", icon: FaPaintBrush, url: "/art-design" },
  { label: "Technology", icon: FaCode, url: "/technology" },
];

export const navLinks = [
  { label: "Home", url: "/" },
  { label: "Explore", url: "/explore" },
  { label: "About us", url: "/about" },
  { label: "Contact us", url: "/contact" },
];

export const menuList = [
  { name: "My Books", url: "/my-books", icon: <FaBook /> },
  { name: "Exchange Requests", url: "/exchange-requests", icon: <FaSyncAlt /> },
  { name: "Account", url: "/account", icon: <FaUser /> },
];

// export  const breadcrumbExploreItems = [
//   { label: "Home", url: "/", icon: FaBook },
//   { label: "Explore Books" },
// ];
