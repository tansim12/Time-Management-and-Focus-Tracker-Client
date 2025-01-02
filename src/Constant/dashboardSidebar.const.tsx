import { FaHeart, FaHome, FaRegNewspaper, FaUser } from "react-icons/fa";
import { TbCategory, TbTransactionDollar } from "react-icons/tb";
import { ReactNode } from "react"; // Import ReactNode for JSX types
import { FiHome } from "react-icons/fi";

import { MdOutlineManageAccounts, MdOutlineManageSearch } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  path?: string;
  icon?: ReactNode; // Allow icon as ReactNode (JSX element)
  children?: SidebarItem[]; // Optional children property for nested links
}

export const sidebarItems: {
  admin: SidebarItem[];
  user: SidebarItem[];
} = {
  admin: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
  ],

  user: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FiHome />,
    },
  ],
};
