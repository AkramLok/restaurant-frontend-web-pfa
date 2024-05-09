import axios from "axios";

const API_URL = "http://localhost:3000/api/owner/";

const getOwnerById = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL + user.ownerId, config);
};

const RestOwnerService = {
  getOwnerById,
};

export default RestOwnerService;
