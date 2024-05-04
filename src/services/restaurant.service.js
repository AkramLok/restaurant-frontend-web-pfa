import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurants";

const addRestaurant = (formData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(API_URL, formData, config);
  //return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getRestaurantByOwnerId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Your owner id: " + user.ownerId);
  return axios.get(API_URL + "/owner/" + user.ownerId, config);
};

{
  /*
const getRestaurantsByOwner = (ownerId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "all/" + ownerId, config);
};
*/
}

const RestService = {
  addRestaurant,
  //getRestaurantsByOwner,
  getRestaurantByOwnerId,
};

export default RestService;
