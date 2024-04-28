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
import NewCategorie from "./pages/Categories/NewCategorie";
import NewProduct from "./pages/Products/NewProduct";
import NewReward from "./pages/Rewards/NewReward";
import NewOffer from "./pages/Offers/NewOffer";
import GetAllRestaurants from "./pages/Restaurant/GetAllRestaurants";
import GetAllCategories from "./pages/Categories/GetAllCategories";
import GetAllProducts from "./pages/Products/GetAllProducts";
import GetAllRewards from "./pages/Rewards/GetAllRewards";
import GetAllOffers from "./pages/Offers/GetAllOffers";

import Footer from "./components/Footer";
import EventBus from "./common/EventBus";
import ProfileMore from "./components/ProfileMore";
import Navbar from "./components/Navbar";
import Bar from "./components/Bar";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { IconContext } from "react-icons";

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
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<ProfileMore />} />
        <Route exact path="/restaurant/new" element={<NewRestaurant />} />
        <Route exact path="/restaurant/all" element={<GetAllRestaurants />} />
        <Route exact path="/categorie/new" element={<NewCategorie />} />
        <Route exact path="/categorie/all" element={<GetAllCategories />} />
        <Route exact path="/product/new" element={<NewProduct />} />
        <Route exact path="/product/all" element={<GetAllProducts />} />
        <Route exact path="/reward/new" element={<NewReward />} />
        <Route exact path="/reward/all" element={<GetAllRewards />} />
        <Route exact path="/offer/new" element={<NewOffer />} />
        <Route exact path="/offer/all" element={<GetAllOffers />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
