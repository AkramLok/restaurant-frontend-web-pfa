import AuthService from "../../services/auth.service";
import React, { useEffect, useMemo, useState } from "react";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
// import { createRestaurantEntry } from "../../utils/dataProvider/restaurants";
import { NavLink, useNavigate } from "react-router-dom";
const Restaurant = () => {
  // const currentUser = AuthService.getCurrentUser();
  // //useDocumentTitle("New Product");
  // const initialState = {
  //   name: "",
  //   price: "",
  //   category_id: "",
  //   desc: "",
  //   image: "",
  // };
  // const [form, setForm] = useState({
  //   name: "",
  //   price: "",
  //   category_id: "",
  //   desc: "",
  //   image: "",
  // });
  // const [error, setError] = useState({
  //   name: "",
  //   price: "",
  //   category_id: "",
  //   desc: "",
  // });
  // const navigate = useNavigate();
  // const [preview, setPreview] = useState("");
  // const [cancel, setCancel] = useState(false);
  // useEffect(() => {
  //   if (!form.image) {
  //     setPreview(undefined);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(form.image);
  //   setPreview(objectUrl);

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [form.image]);

  // const onSelectFile = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setForm({ ...form, image: "" });
  //     return;
  //   }

  //   if (e.target.files[0].size > 2097152) {
  //     return toast.error("Files must not exceed 2 MB");
  //   }

  //   // I've kept this example simple by using the first image instead of multiple
  //   setForm({ ...form, image: e.target.files[0] });
  // };

  // const [isLoading, setLoading] = useState("");
  // const controller = useMemo(() => new AbortController(), []);
  // const formChangeHandler = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (
  //     form.category_id === "" ||
  //     form.desc === "" ||
  //     form.name === "" ||
  //     form.price === ""
  //   ) {
  //     return toast.error("Input required form");
  //   }

  //   setLoading(true);
  //   createRestaurantEntry(form, localStorage.getItem('token'), controller)
  //     .then((result) => {
  //       console.log(result.data);
  //       navigate(`/products/detail/${result.data.data[0].id}`, {
  //         replace: true,
  //       });
  //       toast.success("Product added successfully");
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(() => setLoading(false));
  // };
  return (
    <main></main>
  );
};

export default Restaurant;
