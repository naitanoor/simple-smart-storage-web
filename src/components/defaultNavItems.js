import React from "react";
import {
  HomeIcon,
  UserIcon,
  FolderPlusIcon,
  MagnifyingGlassIcon,
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
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    id: 4,
    label: "Find",
    link: "/search-box",
    icon: <MagnifyingGlassIcon className="w-6 h-6" />,
  },
  {
    id: 5,
    label: "Profile",
    link: "/profile",
    icon: <UserIcon className="w-6 h-6" />,
  },
];
