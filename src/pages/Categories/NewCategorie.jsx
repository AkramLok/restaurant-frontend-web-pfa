import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import CategorieService from "../../services/categorie.service";
import AuthService from "../../services/auth.service";
import RestService from '../../services/restaurant.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};


const NewCategorie = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [restaurantSelected, setRestaurantSelected] = useState({});
  const [ownerWithRestaurants, setOwnerWithRestaurants] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchOwnerWithRestaurants = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          const restaurantsResponse = await RestService.getRestaurantsByOwner(user.id);
          const ownerWithRestaurantsData = {
            owner: user,
            restaurants: restaurantsResponse.data
          };
          setOwnerWithRestaurants(ownerWithRestaurantsData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching owner with restaurants:', error);
        setLoading(false);
      }
    };

    fetchOwnerWithRestaurants();
  }, []);

  const options = ownerWithRestaurants && ownerWithRestaurants.restaurants.length > 0
  ? ownerWithRestaurants.restaurants.map(restaurant => ({
      label: restaurant.name,
      value: restaurant.id
    }))
  : [];


  // Move the console.log outside the JSX
useEffect(() => {
  if (ownerWithRestaurants && ownerWithRestaurants.restaurants.length > 0) {
    console.log("First restaurant ID:", options[0].id);
    console.log("Options for Select component:", options.map(restaurant => ({
      label: restaurant.name,
      value: restaurant.id
    })));
  }
}, [ownerWithRestaurants]);

const handleChange = (restaurantSelected) => {
  setRestaurantSelected(restaurantSelected);
};

  const handleCategorie = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);


    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      CategorieService.addCategorie(name, description, restaurantSelected.value)
      .then((response) => {
        console.log("Response:", response); // Check the value of response
        if (response && response.data) {
          console.log("Response data:", response.data); // Check the value of response.data
          setMessage(response.data.message);
          setSuccessful(true);
        } else {
          console.error("Response or response data is undefined.");
          setMessage("An error occurred while processing your request.");
          setSuccessful(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
    
        setMessage(resMessage);
        setSuccessful(false);
      });
    
    }
  };

  
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <Form onSubmit={handleCategorie} ref={form}>
          {ownerWithRestaurants ? (
            ownerWithRestaurants.restaurants.length > 0 ? (
              <div>
                <p>{console.log(ownerWithRestaurants.restaurants[0].id)}</p>
                <p>{console.log(ownerWithRestaurants.restaurants.map(restaurant => ({
                      label: restaurant.name,
                      value: restaurant.id
                    })))}</p>
                  <Select
                    isLoading
                    placeholder="Select a restaurant"
                    label="Select a restaurant"
                    defaultValue={restaurantSelected}
                    onChange={handleChange}
                    options={options}
                  />
              </div>
            ) : (
              <p>No restaurants available</p>
            )
          ) : (
            <p>Loading...</p>
          )}
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
              Categorie Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter categorie name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              validations={[required]}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-white">
              Categorie Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              validations={[required]}
              placeholder="Enter categorie description"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <p>{console.log(restaurantSelected.label)}</p>
          <p>op: {restaurantSelected?restaurantSelected.label: "dsf"}</p>

          {message && (
            <div className="text-sm text-center text-gray-700 dark:text-gray-200 mb-8">
              <div
                className={`${
                  successful ? "bg-green-500" : "bg-red-500"
                } text-white font-bold rounded-lg border border-white shadow-lg p-5`}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton className="text-sm" style={{ display: "none" }} ref={checkBtn} />
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#005055] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewCategorie;
