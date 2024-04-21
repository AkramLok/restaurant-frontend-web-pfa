import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurants/";

const add = (email, location, name, openingHours, phone, status, ownerEmail) => {
  // Get the token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  console.log(token);

  // Set the authorization header with the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Make the POST request with the provided data and config
  return axios.post(API_URL+ "create", {
    email,
    location,
    name,
    openingHours,
    phone,
    status,
    ownerEmail,
  }, config);
};

const RestService = {
  add,
}

export default RestService;
