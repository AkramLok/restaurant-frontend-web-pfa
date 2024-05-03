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
    return (
      <nav className="sticky top-0 z-40 backdrop-blur-xl border-gray-100" style={{ backgroundColor: '#005055' }}>
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link to={"/"} className="text-white text-2xl font-bold">
        RestCoffee
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link to={"/home"} className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        {currentUser && (
          <li>
            <Link to={"/menu"} className="text-white hover:text-gray-300">
              Menu
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/restaurant/new"} className="text-white hover:text-gray-300">
              RAdd
            </Link>
          </li>
        )}
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
            <Link to={"/product/new"} className="text-white hover:text-gray-300">
              PAdd
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
            <Link to={"/reward/new"} className="text-white hover:text-gray-300">
              RAdd
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/reward/all"} className="text-white hover:text-gray-300">
              RShow
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/offer/new"} className="text-white hover:text-gray-300">
              OAdd
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/offer/all"} className="text-white hover:text-gray-300">
              OShow
            </Link>
          </li>
        )}
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
      <div className="flex items-center">
          {currentUser ? (
          <div className="text-white text-sm mr-4">
            <Link to={"/profile"}>{currentUser.username}</Link>
          </div>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link to={"/login"} className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"} className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </li>
            {/* <li>
              <button onClick={() => darkModeHandler()}>
                {dark && <IoSunny className="text-white"/>}
                {!dark && <IoMoon className="text-gray-900"/>}
              </button>
            </li> */}
          </ul>
        )}
        {!currentUser && (
          <ul className="ml-6">
            <li>
              <button type="button" aria-label="Color Mode" onClick={() => darkModeHandler()} class="flex justify-center p-2 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:dark:bg-gray-900 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50">
                {dark &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
                {!dark &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transform -rotate-90"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>}
              </button>
            </li>
          </ul>
        )}
        {currentUser && (
          <ul className="flex space-x-4">
            <li>
              <Link to={"/login"} className="text-white hover:text-gray-300" onClick={logOut}>
                LogOut
              </Link>
            </li>
          </ul>
        )}
        {currentUser && (
          <ul className="ml-6">
            <li>
              <button type="button" aria-label="Color Mode" onClick={() => darkModeHandler()} class="flex justify-center p-2 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:dark:bg-gray-900 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50">
                {dark &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
                {!dark &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transform -rotate-90"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>}
              </button>
            </li>
          </ul>
        )}

      </div>
    </div>
  </nav>
    );
}

export default Navbar;