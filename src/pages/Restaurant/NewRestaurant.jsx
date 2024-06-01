import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import RestService from "../../services/restaurant.service";
import AuthService from "../../services/auth.service";
import { isEmail } from "validator";
import { Textarea } from "@tremor/react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import GeoLocation from "../../components/GeoLocation";
import Skeleton from "./Skeleton";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This is not a valid email.
      </div>
    );
  }
};

const NewRestaurant = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [instagram, setInstagram] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);
        console.log(restaurantOwned);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching your restaurant:", error);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeLocation = (e) => setLocation(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeCuisine = (e) => setCuisine(e.target.value);
  const onChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeInstagram = (e) => setInstagram(e.target.value);
  const onChangePriceRange = (e) => setPriceRange(e.target.value);

  const handleLogoFileChange = (e) => {
    setLogoFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleCoverFileChange = (e) => {
    setCoverFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log("1-logo: " + logoFile);
    console.log("2-cover: " + coverFile);
  };

  const handleLocationChange = (coords) => {
    setLocation(coords);
  };

  const handleRestaurant = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    const ownerId = currentUser.ownerId;
    console.log(
      JSON.stringify({
        email,
        location,
        name,
        cuisine,
        phoneNumber,
        description,
        instagram,
        priceRange,
        ownerId,
      })
    );

    if (checkBtn.current.context._errors.length === 0) {
      const formData = new FormData();

      const json = JSON.stringify({
        email,
        location,
        name,
        cuisine,
        phoneNumber,
        description,
        instagram,
        priceRange,
      });

      const blob = new Blob([json], {
        type: "application/json",
      });

      formData.append("restaurant", blob);
      formData.append("logoFile", logoFile);
      formData.append("coverFile", coverFile);
      const RestaurantId = restaurantOwned.id;
      if (RestaurantId) {
        formData.append("restaurantId", RestaurantId);
        RestService.modifyRestaurant(formData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            updateRestaurant();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(error);
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } else {
        formData.append("ownerId", ownerId);
        RestService.addRestaurant(formData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            updateRestaurant();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(error);
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    }
  };

  const updateRestaurant = async () => {
    try {
      const responseCategories = await RestService.getRestaurantByOwnerId();
      const RestaurantOwned = responseCategories.data;
      setRestaurantOwned(RestaurantOwned);
    } catch (error) {
      console.error("Error fetching updated categories:", error);
    }
  };

  const locationB = useLocation();
  const getBreadcrumbs = () => {
    const paths = [
      { name: "Home", url: "/" },
      { name: "Restaurant", url: "/restaurant/new" },
    ];
    const currentPath = locationB.pathname;
    return paths;
  };

  return (
    <section class="text-gray-600 body-font">
      <Breadcrumbs paths={getBreadcrumbs()} />
      {loading ? (
        <Skeleton />
      ) : (
        <div class="container px-5 py-24 mx-auto bg-white dark:bg-opacity-80 dark:bg-[#111827] bg-opacity-85 backdrop-filter backdrop-blur-md body-font">
          <div className="flex items-center justify-center p-5">
            <div className="mx-auto w-full max-w-[1280px]">
              <span className="block text-3xl font-semibold mb-4 dark:text-white">
                {restaurantOwned.id
                  ? "Modify Restaurant " + restaurantOwned.name
                  : "Add Restaurant"}
              </span>
              <Form onSubmit={handleRestaurant} ref={form}>
                <div class="mb-5">
                  <label
                    for="name"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Restaurant/Coffee Shop Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={onChangeName}
                    validations={[required]}
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 dark:text-white block font-medium text-[#07074D]"
                  >
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                    placeholder="example@domain.com"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="location"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Location{" "}
                    {location ? console.log(location) : " Not selected !"}
                  </label>
                  <GeoLocation onLocationChange={handleLocationChange} />
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    value={
                      location
                        ? "Latitude: " +
                          location.latitude +
                          " / Longitude: " +
                          location.longitude
                        : ""
                    }
                    disabled
                    onChange={onChangeLocation}
                    placeholder="Select a location to get coordinates !"
                    className="w-full px-6 mt-5 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="cuisine"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Cuisine
                  </label>
                  <Input
                    type="text"
                    name="cuisine"
                    id="cuisine"
                    value={cuisine}
                    onChange={onChangeCuisine}
                    validations={[required]}
                    placeholder="Enter your restaurant/coffee shop cuisine"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="phone"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Phone Number
                  </label>
                  <Input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                    validations={[required]}
                    placeholder="Enter your restaurant/coffee shop phone number"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="description"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Description
                  </label>
                  <Textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={onChangeDescription}
                    validations={[required]}
                    placeholder="Enter your Restaurant/Coffee shop description"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="instagram"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Instagram
                  </label>
                  <Input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={instagram}
                    onChange={onChangeInstagram}
                    validations={[required]}
                    placeholder="Enter your Restaurant/Coffee shop instagram"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="price_range"
                    class="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Price Range
                  </label>
                  <Input
                    type="text"
                    name="priceRange"
                    id="priceRange"
                    value={priceRange}
                    onChange={onChangePriceRange}
                    validations={[required]}
                    placeholder="Enter your Restaurant/Coffee shop price range"
                    className="w-full px-6 dark:text-gray-200 dark:bg-gray-600 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-10">
                  <label
                    htmlFor="image"
                    className="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Logo
                  </label>
                  <input
                    required
                    type="file"
                    onChange={handleLogoFileChange}
                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-700 border rounded-md file:bg-gray-200 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full file:bg-gray-800 file:text-gray-200 text-gray-300 placeholder-gray-400/70 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-500 focus:shadow-md"
                  />

                  <label
                    htmlFor="image"
                    className="mb-3 block dark:text-white font-medium text-[#07074D]"
                  >
                    Cover
                  </label>
                  <input
                    required
                    type="file"
                    onChange={handleCoverFileChange}
                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-700 border rounded-md file:bg-gray-200 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full file:bg-gray-800 file:text-gray-200 text-gray-300 placeholder-gray-400/70 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-500 focus:shadow-md"
                  />
                </div>

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
                <CheckButton
                  className="text-sm"
                  style={{ display: "none" }}
                  ref={checkBtn}
                />
                <div>
                  <button
                    type="submit"
                    class="hover:shadow-form rounded-md bg-[#005055] py-3 px-8 text-white font-semibold dark:text-white outline-none"
                  >
                    {restaurantOwned.id
                      ? "Modify Restaurant " + restaurantOwned.name
                      : "Add Restaurant"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewRestaurant;
