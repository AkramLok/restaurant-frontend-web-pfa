import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurants/";

const add = (
  email,
  location,
  name,
  openingHours,
  phone,
  status,
  ownerEmail
) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    API_URL + "create",
    {
      email,
      location,
      name,
      openingHours,
      phone,
      status,
      ownerEmail,
    },
    config
  );
};

const getAll = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL, config);
};

const RestService = {
  add,
  getAll,
};

export default RestService;
