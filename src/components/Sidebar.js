/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5"; // Import the logout icon from a different library

import { removeData } from "../api/CommonFunctions";
import { AppContext } from "../context/AppContext";
import { defaultNavItems } from "./defaultNavItems";

const Sidebar = () => {
  const { setIsSignedIn, setUserData } = useContext(AppContext);

  useEffect(() => {
    const openButton = document.querySelector(
      '[data-drawer-target="default-sidebar"]'
    );
    const sidebar = document.getElementById("default-sidebar");

    const openSidebar = () => {
      sidebar.classList.remove("-translate-x-full");
    };

    const closeSidebar = () => {
      sidebar.classList.add("-translate-x-full");
    };

    openButton.addEventListener("click", openSidebar);

    // Close the sidebar when clicking outside
    window.addEventListener("click", (event) => {
      if (
        !sidebar.contains(event.target) &&
        !openButton.contains(event.target)
      ) {
        closeSidebar();
      }
    });

    // Clean up event listeners
    return () => {
      openButton.removeEventListener("click", openSidebar);
      window.removeEventListener("click", closeSidebar);
    };
  }, []);

  const handleLogout = async () => {
    await removeData("userData");
    setUserData(null);
    setIsSignedIn(false);
  };

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/dashboard" class="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Smart Storage
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <div>
                  <Link to={"/profile"}>
                    <button
                      type="button"
                      class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="w-8 h-8 rounded-full"
                        src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=1380"
                        alt="user photo"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            {defaultNavItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="border-2 rounded-lg nav-link flex items-center p-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  activeClassName="nav-link-active"
                >
                  <a className="flex items-center p-2 text-gray-900 ">
                    {item.icon}
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {item.label}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            <IoLogOutOutline
              size={20}
              className="inline-block align-text-bottom"
            />
            <span className="ml-3 whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
