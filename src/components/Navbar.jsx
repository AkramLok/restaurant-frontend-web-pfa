import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import logo from "../assets/logo_CP.png";

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu visibility
  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  useEffect(() => {
    // Update local storage when dark mode changes
    localStorage.setItem("darkMode", dark);
    // Add or remove dark mode class based on state
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  const darkModeHandler = () => {
    setDark((prevDark) => !prevDark); // Toggle dark mode state
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };
  return (
    <nav class="bg-quartenary sticky top-0 z-10 border-b border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          {/*<img
            //src="https://flowbite.com/docs/images/logo.svg"
            src={logo}
            class="h-10"
            alt="Flowbite Logo"
  />*/}
          <svg
            class="css-ze2te4 css-1j6mmh7"
            className="h-7"
            viewBox="0 0 44.871794871794876 44.871794871794876"
          >
            <g
              transform="translate(-11.02724640868803, -11.013864000405867) scale(13.382580577579377)"
              class="css-73gxgp"
              fill="#00adb5"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path d="M3.726,1.855C3.44,2.127,3.042,2.237,2.661,2.292c-0.34,0.05-0.695,0.071-0.999,0.203C1.344,2.634,1.144,2.864,1.16,3.22   c0.01,0.214,0.125,0.423,0.287,0.584C1.492,3.84,1.538,3.874,1.586,3.905C1.583,3.899,1.58,3.892,1.575,3.886   C1.382,3.621,1.232,2.862,2.242,2.697C2.445,2.664,2.648,2.63,2.85,2.584c0.178-0.041,0.496-0.141,0.531-0.16   c0.029-0.017-0.189,0.228-0.857,0.42C1.463,3.149,1.789,4.03,2.113,4.131C2.237,4.161,2.367,4.176,2.5,4.176   c0.926,0,1.677-0.75,1.677-1.676c0-0.333-0.097-0.643-0.264-0.903C3.868,1.695,3.805,1.779,3.726,1.855z"></path>
                <path d="M0.824,2.5c0,0.184,0.03,0.359,0.084,0.525c0.02-0.182,0.082-0.354,0.198-0.5c0.21-0.267,0.536-0.392,0.875-0.459   C2.319,2,2.679,1.992,3.026,1.908c0.192-0.046,0.387-0.121,0.542-0.244C3.697,1.56,3.757,1.402,3.623,1.255   C3.574,1.211,3.522,1.169,3.468,1.131c0.098,0.201,0.022,0.5-0.773,0.578C2.491,1.73,2.288,1.749,2.087,1.777   C2.028,1.785,1.955,1.796,1.88,1.809c0,0,0.066-0.082,0.532-0.188c0.958-0.216,0.779-0.633,0.495-0.748   c-0.13-0.032-0.267-0.05-0.407-0.05C1.574,0.824,0.824,1.574,0.824,2.5z"></path>
              </g>
            </g>
          </svg>

          <Link
            to={"/"}
            className="dark:text-white self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >
            Coffee & Plates
          </Link>
        </a>
        <div class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          {currentUser ? (
            <div className="text-sm">
              <Link
                to={"/profile"}
                className="dark:text-white text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                {currentUser.username}
              </Link>
            </div>
          ) : (
            <div className="text-white text-sm mr-4">
              <Link
                to={"/login"}
                className="dark:text-white mr-2 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="dark:text-white text-white bg-primary hover:bg-tertiary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-primary dark:hover:bg-tertiary focus:outline-none dark:focus:ring-blue-800"
              >
                Sign up
              </Link>
            </div>
          )}
          {!currentUser && (
            <ul className="ml-6">
              <li>
                <button
                  type="button"
                  aria-label="Color Mode"
                  onClick={darkModeHandler}
                  class="flex justify-center p-2 text-[#111827] transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-gray-200 lg:dark:bg-[#111827] dark:text-gray-200 dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-[#111829] active:bg-gray-50"
                >
                  {dark && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}
                  {!dark && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5 transform -rotate-90"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul className="text-sm mr-4">
              <li>
                <Link
                  to={"/login"}
                  className="hover:text-white mr-4 dark:text-white text-white bg-primary hover:bg-tertiary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-primary dark:hover:bg-tertiary focus:outline-none dark:focus:ring-blue-800"
                  onClick={logOut}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul className="ml-6">
              <li>
                <button
                  type="button"
                  aria-label="Color Mode"
                  onClick={darkModeHandler}
                  class="flex justify-center p-2 text-[#111827] transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-gray-200 lg:dark:bg-[#111827] dark:text-gray-200 dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-[#111829] active:bg-gray-50"
                >
                  {dark && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}
                  {!dark && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5 transform -rotate-90"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          )}

          <button
            data-collapse-toggle="mega-menu"
            type="button"
            onClick={toggleMenu}
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          id="mega-menu"
          class={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            showMenu ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li>
              <Link
                to={"/home"}
                className="hover:text-gray-300 dark:text-white"
              >
                Home
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link
                  to={"/restaurant/new"}
                  className="hover:text-gray-300 dark:text-white"
                >
                  Restaurant
                </Link>
              </li>
            )}
            {currentUser && (
              <li>
                <Link
                  to={"/menu"}
                  className="hover:text-gray-300 dark:text-white"
                >
                  Menu
                </Link>
              </li>
            )}
            {currentUser && (
              <li>
                <Link
                  to={"/rewards"}
                  className="hover:text-gray-300 dark:text-white"
                >
                  Rewards
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
