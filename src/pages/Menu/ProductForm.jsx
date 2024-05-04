import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ProdService from "../../services/product.service";
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


const ProductForm = ({category, toggleModalProduct, updateCategories}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [bonusPoints, setBonusPoints] = useState("");

  const [productFile, setProductFile] = useState(null);
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


  const onChangeName = (e) => setName(e.target.value);
  const onChangeInfo = (e) => setInfo(e.target.value);
  const onChangePrice = (e) => setPrice(e.target.value);
  const onChangeBonusPoints = (e) => setBonusPoints(e.target.value);

  const handleProductFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProductFile(selectedFile);
    console.log("File details:", selectedFile);
  };
  
  



  const handleProduct = (e) => {
  e.preventDefault();

  setMessage("");
  setSuccessful(false);

  form.current.validateAll();
  const ownerId = currentUser.ownerId;
  console.log(JSON.stringify({
    name,
    info,
    price,
    bonusPoints,
    ownerId
  }));



  if (checkBtn.current.context._errors.length === 0) {
    const formData = new FormData();

    const json = JSON.stringify({
      name,
      info,
      price,
      bonusPoints,
    });

    const blob = new Blob([json], {
    type: 'application/json'
    });

    formData.append("product", blob);
    formData.append("productFile", productFile);


    ProdService.addProductByCategorieId(formData, category.id).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        updateCategories();

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
    <div className="flex items-center justify-center p-5">
      <div className="mx-auto w-full max-w-[550px]">
        <Form onSubmit={handleProduct} ref={form}>
          <div class="mb-5">
            <label
              for="name"
              class="mb-3 block text-black font-medium text-[#07074D]"
            >
              Product Name To Add in {category.name}
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your product name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="price"
              class="mb-3 block text-black font-medium text-[#07074D]"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={onChangePrice}
              validations={[required]}
              placeholder="Enter your product price"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-black font-medium text-[#07074D]"
            >
              Bonus Points
            </label>
            <input
              type="text"
              name="bonusPoints"
              id="bonusPoints"
              value={bonusPoints}
              onChange={onChangeBonusPoints}
              validations={[required]}
              placeholder="Enter bonus points when purchasing the product"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="Info"
              class="mb-3 block text-black font-medium text-[#07074D]"
            >
              Info
            </label>
            <input
              type="text"
              name="info"
              id="info"
              value={info}
              onChange={onChangeInfo}
              validations={[required]}
              placeholder="Enter your Product info"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-10">
            <label
              htmlFor="image"
              className="mb-3 block text-black font-medium text-[#07074D]"
            >
              Product Image
            </label>
            <input
            required
              type="file"
              onChange={handleProductFileChange}
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
              class="hover:shadow-form rounded-md bg-[#005055] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
            <button onClick={toggleModalProduct} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-3 px-8 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
          </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
