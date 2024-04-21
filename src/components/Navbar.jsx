import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

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
    return (
      <nav className="bg-gray-900">
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
            <Link to={"/restaurant"} className="text-white hover:text-gray-300">
              Restaurant
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
          </ul>
        )}
        {currentUser && (
          <a href="/login" className="text-white hover:text-gray-300" onClick={logOut}>
            LogOut
          </a>
        )}
      </div>
    </div>
  </nav>
    );
}

export default Navbar;