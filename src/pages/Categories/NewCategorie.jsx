import React, { useEffect, useMemo, useState, useRef } from "react";
import { Routes, Route, Link, NavLink,useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CategorieService from "../../services/categorie.service";
import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};



const Categorie = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleCategorie = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CategorieService.add(name, description, currentUser.email).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
      <Form onSubmit={handleCategorie} ref={form}>
          <div class="mb-5">
            <label
              for="name"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Categorie Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter categorie name"
              value={name} onChange={onChangeName} validations={[required]}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Categorie Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={description} onChange={onChangeDescription} validations={[required]}
              placeholder="Enter categorie description"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label for="image" class="mb-3 block text-base font-medium text-[#07074D]">Image</label>
            <input type="file" class="block w-full px-3 py-2 mt-2 text-sm text-[#6B7280] bg-white border border-[#e0e0e0] rounded-md file:bg-gray-200 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full file:bg-gray-800 file:text-gray-200 text-gray-300 placeholder-gray-400/70 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:border-[#6A64F1] focus:shadow-md" />
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
          <CheckButton className="text-sm" style={{ display: "none" }} ref={checkBtn} />
          <div>
            <button
              type="submit"
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>

          </div>
        </Form>
      </div>
    </div> 
);
};

export default Categorie;
