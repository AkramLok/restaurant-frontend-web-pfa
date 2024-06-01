import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link and useNavigate
import restGestion from "../assets/images/imageHome4.webp";
import "../style/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Add animation
    const img = document.getElementById("restGestion");

    // Remove animation class after it ends and navigate
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0">
      <div className="flex flex-col items-center max-w-2xl md:px-8">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-5">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto bg-gradient-to-r from-tertiary via-[#008B92] to-[#007B82] p-4 rounded-lg shadow-lg">
            Welcome to Your Restaurant Management Platform
          </h2>
          <p className="text-white md:text-lg">
            Easily manage your restaurant, products, offers, and clients with
            our intuitive platform.
          </p>
        </div>
        <Link
          to="/register"
          className="inline-flex items-center mb-6 justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-tertiary hover:bg-[#007B82] focus:shadow-outline focus:outline-none"
        >
          Get Started
        </Link>
      </div>
      <img
        id="restGestion"
        src={restGestion}
        className="w-full max-w-screen-sm mx-auto rounded shadow-2xl md:w-auto lg:max-w-screen-md transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        alt="Food Image"
        onClick={handleClick}
      />
    </div>
  );
};

export default Header;
