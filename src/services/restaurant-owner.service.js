import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurant-owners/";

const getAllOwners = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(API_URL + "all", config);
};

// const getAllOwners = () => {
//   return axios
//     .get(API_URL + "all")
//     .then((response) => {
//       // Handle successful response
//       return response.data; // Return the data received from the server
//     })
//     .catch((error) => {
//       // Handle error
//       console.error("Error fetching owners:", error);
//       throw error; // Re-throw the error to handle it elsewhere if needed
//     });
// };

const compareOwner = (owners, email) => {
  for (const owner of owners) {
    if (owner.email === email) {
      return true;
    }
  }
  return false;
};

const RestOwnerService = {
  getAllOwners,
  compareOwner,
};

export default RestOwnerService;
