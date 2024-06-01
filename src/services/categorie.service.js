import axios from "axios";

const API_URL = "http://localhost:3000/api/food-categories/";

const addCategorie = (name, restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    API_URL + restaurantId,
    {
      name,
    },
    config
  );
};

const modifyCategorie = (name, categoryId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.put(
    API_URL + categoryId,
    {
      name,
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
  return axios.get(API_URL + "restaurant/" + restaurantId, config);
};

const CategorieService = {
  addCategorie,
  modifyCategorie,
  getCategoriesByRestaurantId,
};

export default CategorieService;
