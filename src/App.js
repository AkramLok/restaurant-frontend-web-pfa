import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
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
import Menu from "./pages/Menu/Menu";
import NewRestaurant from "./pages/Restaurant/NewRestaurant";
import NewCategorie from "./pages/Categories/NewCategorie";
import GetAllProducts from "./pages/Products/GetAllProducts";
import Rewards from "./pages/Rewards/Rewards";
import NotFound from "./pages/Other/NotFound";
import Footer from "./components/Footer";
import EventBus from "./common/EventBus";
import ProfileMore from "./components/ProfileMore";
import Navbar from "./components/Navbar";
import Bar from "./components/Bar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { IconContext } from "react-icons";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever route changes
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<ProfileMore />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/rewards" element={<Rewards />} />
        <Route exact path="/restaurant/new" element={<NewRestaurant />} />
        <Route exact path="/categorie/new" element={<NewCategorie />} />
        <Route exact path="/product/all" element={<GetAllProducts />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
