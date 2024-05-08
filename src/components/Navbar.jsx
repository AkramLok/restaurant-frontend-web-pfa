import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu visibility

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

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };
  return (
    <nav class="bg-white sticky top-0 z-10 border-b border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <Link
            to={"/"}
            className="dark:text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            RestCoffee
          </Link>
        </a>
        <div class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          {currentUser ? (
            <div className="text-sm mr-4">
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
                className="dark:text-white text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="dark:text-white text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </Link>
            </div>
          )}
          {!currentUser && (
            <ul className="ml-6">
              <li>
                <button
                  type="button"
                  aria-label="Color Mode"
                  onClick={() => darkModeHandler()}
                  class="flex justify-center p-2 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:dark:bg-gray-900 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50"
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
            <ul className="flex space-x-4">
              <li>
                <Link
                  to={"/login"}
                  className="hover:text-gray-300 dark:text-white"
                  onClick={logOut}
                >
                  LogOut
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
                  onClick={() => darkModeHandler()}
                  class="flex justify-center p-2 text-[#111827] transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:dark:bg-[#111827] dark:text-gray-200 dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-[#111827] active:bg-gray-50"
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
          <ul className="flex space-x-4">
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

            {/*
        {currentUser && (
          <li>
            <Link to={"/restaurant/all"} className="text-white hover:text-gray-300">
              RShow
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/categorie/new"} className="text-white hover:text-gray-300">
              CAdd
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/categorie/all"} className="text-white hover:text-gray-300">
              CShow
            </Link>
          </li>
        )}
                {currentUser && (
          <li>
            <Link to={"/categorie/new"} className="text-white hover:text-gray-300">
              CAdd
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/product/all"} className="text-white hover:text-gray-300">
              PShow
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/product/new"} className="text-white hover:text-gray-300">
              PAdd
            </Link>
          </li>
        )}*/}

            {/* {showModeratorBoard && (
          <li>
            <Link to={"/mod"} className="text-white hover:text-gray-300">
              Moderator Board
            </Link>
          </li>
        )}
        {showAdminBoard && (
          <li>
            <Link to={"/admin"} className="text-white hover:text-gray-300">
              Admin Board
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/user"} className="text-white hover:text-gray-300">
              User
            </Link>
          </li>
        )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
