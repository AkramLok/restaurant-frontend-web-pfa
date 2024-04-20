import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import NewRestaurant from "./pages/Restaurant/NewRestaurant";
import Footer from "./components/Footer";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
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
    <div>
  <nav className="bg-gray-900">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link to={"/"} className="text-white text-2xl font-bold">
        CafeResto
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
  <div className="container mx-auto mt-8">
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/restaurant" element={<NewRestaurant />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />
    </Routes>
  </div>
  <Footer/>
</div>

  );
};

export default App;
