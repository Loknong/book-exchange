import {
  FaAddressCard, FaLock, FaUser, FaExchangeAlt, 
  FaBell, FaCog, FaHeart, FaListAlt
} from "react-icons/fa";
import { AiFillBook, AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { BiMessageDetail, BiHistory } from "react-icons/bi";

// Account Items
export const sidebarAccountItems = [
  {
    label: "Overviews",
    path: "/account",
    icon: FaAddressCard,
  },
  {
    label: "Profile Info",
    path: "/account/profile",
    icon: FaUser,
  },
  {
    label: "Manage Address",
    path: "/account/manage-address",
    icon: FaListAlt,
  },
  {
    label: "Change Password",
    path: "/account/change-password",
    icon: FaLock,
  },
];

// My Books Items
export const sidebarMyBooksItems = [
  {
    label: "Listed Books",
    path: "/my-books/listed",
    icon: AiFillBook,
  },
  {
    label: "Add New Book",
    path: "/my-books/add",
    icon: AiOutlinePlus,
  },
  {
    label: "Wishlist",
    path: "/my-books/wishlist",
    icon: FaHeart,
  },
];

// Exchange Requests Items
export const sidebarExchangeItems = [
  {
    label: "Incoming Requests",
    path: "/exchange/incoming",
    icon: FaExchangeAlt,
  },
  {
    label: "Outgoing Requests",
    path: "/exchange/outgoing",
    icon: FaExchangeAlt,
  },
  {
    label: "Trade History",
    path: "/exchange/history",
    icon: BiHistory,
  },
];

// Notifications Items
export const sidebarNotificationsItems = [
  {
    label: "Messages",
    path: "/notifications/messages",
    icon: BiMessageDetail,
  },
  {
    label: "Offers",
    path: "/notifications/offers",
    icon: FaBell,
  },
  {
    label: "Alerts",
    path: "/notifications/alerts",
    icon: FaBell,
  },
];

// Settings Items
export const sidebarSettingsItems = [
  {
    label: "Privacy Settings",
    path: "/settings/privacy",
    icon: FaCog,
  },
  {
    label: "Notification Preferences",
    path: "/settings/notifications",
    icon: AiOutlineSetting,
  },
  {
    label: "Subscription Plan",
    path: "/settings/subscription",
    icon: FaCog,
  },
];
