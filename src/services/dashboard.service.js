import axios from "axios";

const API_URL = "http://localhost:3000/api/orders/";

const getOrdersByRestaurantId = (restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URL + "restaurant/" + restaurantId, config);
};

const API_URLFeedbacks = "http://localhost:3000/api/feedback/";
const getFeedbacksByRestaurantId = (restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URLFeedbacks + "restaurant/" + restaurantId, config);
};

const API_URLWaiters = "http://localhost:3000/api/waiters/";
const getWaitersByRestaurantId = (restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URLWaiters + "restaurant/" + restaurantId, config);
};

const API_URLClients = "http://localhost:3000/api/participation/";
const getParticipationsByRestaurantId = (restaurantId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(API_URLClients + "restaurant/" + restaurantId, config);
};

const DashboardService = {
  getOrdersByRestaurantId,
  getFeedbacksByRestaurantId,
  getWaitersByRestaurantId,
  getParticipationsByRestaurantId,
};

export default DashboardService;
