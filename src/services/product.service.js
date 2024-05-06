import axios from "axios";

const API_URL = "http://localhost:3000/api/product/";

const addProductByCategorieId = (formData, categoryId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  console.log(token);

  const config = {
    headers: {
      "Content-Type": "Multiplart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(API_URL + "foodCategory/" + categoryId, formData, config);
};

const getAllProductsByCategoryId = (categoryId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL + "foodCategory/" + categoryId, config);
};

const deleteProductByCategoryId = (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(API_URL + productId, config);
};

const ProductService = {
  addProductByCategorieId,
  getAllProductsByCategoryId,
  deleteProductByCategoryId,
};

export default ProductService;
