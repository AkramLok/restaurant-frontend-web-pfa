import axios from "axios";

const API_URL = "http://localhost:3000/api/products/";

const addProduct = (
  name,
  description,
  price,
  available,
  ownerEmail,
  restaurantId,
  categorieId
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
      name,
      description,
      price,
      available,
      ownerEmail,
      restaurantId,
      categorieId,
    },
    config
  );
};

const getAllProducts = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL, config);
};

const ProductService = {
  addProduct,
  getAllProducts,
};

export default ProductService;
