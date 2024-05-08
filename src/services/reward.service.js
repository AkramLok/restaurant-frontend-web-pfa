import axios from "axios";

const API_URL = "http://localhost:3000/api/reward/";

const addRewardByProductId = (requiredPoints, productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    API_URL + "product/" + productId,
    {
      requiredPoints,
    },
    config
  );
};

const getRewardByProductId = (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL + "product/" + productId, config);
};

const deleteRewardByProductId = (rewardId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(API_URL + rewardId, config);
};

const RewardService = {
  addRewardByProductId,
  getRewardByProductId,
  deleteRewardByProductId,
};

export default RewardService;
