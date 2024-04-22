import axios from "axios";

const API_URL = "http://localhost:3000/api/categories/";

const add = (email, name, description, ownerEmail, restaurantId) => {
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
    name,
    description,
    ownerEmail,
    restaurantId,
  }, config);
};

const getAllCategories = (restaurantId) => {
  const url = `${API_URL}?restId=${restaurantId}`;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(url, config);
};

const CategorieService = {
  add,
  getAllCategories,
}

export default CategorieService;
