import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const add = (username, email, password, firstName, lastName, phone, address) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
  });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const RestService = {
    add,
    getCurrentUser,
  }

export default RestService;
