import axios from "axios";

const API_URL = "http://localhost:3000/api/discount/";

const addDiscountByProductId = (discountPercentage, productId) => {
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
      discountPercentage,
    },
    config
  );
};

const getDiscountByProductId = (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL + "product/" + productId, config);
};

const deleteDiscountByProductId = (discountId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(API_URL + discountId, config);
};

const DiscountService = {
  addDiscountByProductId,
  getDiscountByProductId,
  deleteDiscountByProductId,
};

export default DiscountService;
