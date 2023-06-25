import React from "react";
import {
  HomeIcon,
  UserIcon,
  FolderIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const defaultNavItems = [
  {
    id: 1,
    label: "Home",
    link: "/dashboard",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    label: "Create",
    link: "/create-box",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    id: 3,
    label: "Search",
    link: "/search-box",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    id: 4,
    label: "Find",
    link: "/find-box",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    id: 5,
    label: "Profile",
    link: "/profile",
    icon: <UserIcon className="w-6 h-6" />,
  },
];
