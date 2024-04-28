import React, { useEffect, useMemo, useState, useRef } from "react";
import { Routes, Route, Link, NavLink,useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CategorieService from "../../services/categorie.service";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";
import Select from "react-select";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};

const restaurants = [
  { label: 'Choose a restaurant', value: '' },
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' }
];

const categories = [
  { label: 'Choose a category', value: '' },
  { label: 'Category 1', value: '1' },
  { label: 'Category 2', value: '2' },
  { label: 'Category 3', value: '3' },
  { label: 'Category 4', value: '4' }
];

const ProductForm = () => {
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
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");


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

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };

  const handleProduct = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      ProductService.addProduct(name, description, price, available, currentUser.email, 1,1/*restaurantId, categorieId*/).then(
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
      <Form onSubmit={handleProduct} ref={form}>
            <Select label="Select a restaurant" options={restaurants} />
            <Select label="Select a category" options={categories} />
          <div class="mb-5">
            <label
              for="name"
              class="mb-3 block text-base font-medium text-white"
            >
              Product Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              value={name} onChange={onChangeName} validations={[required]}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-base font-medium text-white"
            >
              Product Description
            </label>
            <Input
              type="text"
              name="description"
              id="description"
              value={description} onChange={onChangeDescription} validations={[required]}
              placeholder="Enter product description"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-base font-medium text-white"
            >
              Product Price
            </label>
            <Input
              type="text"
              name="price"
              id="price"
              value={price} onChange={onChangePrice} validations={[required]}
              placeholder="Enter product price"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-base font-medium text-white"
            >
              Is Product Available ?
            </label>
            <select
              name="available"
              id="available"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

          </div>

          <div class="mb-10">
            <label for="image" class="mb-3 block text-base font-medium text-white">Product Image</label>
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
              class="hover:shadow-form rounded-md bg-[#005055] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>

          </div>
        </Form>
      </div>
    </div> 
);
};

export default ProductForm;