import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import CategorieService from "../../services/categorie.service";
import AuthService from "../../services/auth.service";
import RestService from "../../services/restaurant.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};

const CategorieForm = ({ restaurantId, toggleModal, updateCategories }) => {
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

  const handleCategorie = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      CategorieService.addCategorie(name, restaurantId)
        .then((response) => {
          console.log("Response:", response); // Check the value of response
          if (response && response.data) {
            console.log("Response data:", response.data); // Check the value of response.data
            setMessage(response.data.message);
            setSuccessful(true);
            updateCategories();
            //toggleModal();
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
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Categorie Name
            </label>
            <Input
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
              className="hover:shadow-form rounded-md bg-[#005055] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Add
            </button>
            <button
              onClick={toggleModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-3 px-8 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CategorieForm;
