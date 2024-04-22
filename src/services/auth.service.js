import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (
  username,
  email,
  password,
  firstName,
  lastName,
  phone,
  address
) => {
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

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const API_URL2 = "http://localhost:3000/api/restaurant-owners/";
const getAll = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL2 + "all", config);
};

const compareOwner = (owners, email) => {
  // Iterate through the list of owners and compare their emails
  for (const owner of owners) {
    console.log(owner);
    if (owner.email === email) {
      // Return true if a matching email is found
      return true;
    }
  }
  // Return false if no matching email is found
  return false;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAll,
  compareOwner,
};

export default AuthService;
