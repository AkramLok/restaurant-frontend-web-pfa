import axios from "axios";

const API_URL = "http://localhost:3000/api/categories/";

const addCategorie = (name, description, restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    API_URL + "create",
    {
      name,
      description,
      restaurantId,
    },
    config
  );
};

const getCategoriesByRestaurantId = (restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "all/" + restaurantId, config);
};

const CategorieService = {
  addCategorie,
  getCategoriesByRestaurantId,
};

export default CategorieService;
