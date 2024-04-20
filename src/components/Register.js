import React, { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

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

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, firstName, lastName, phone, address).then(
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
    <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
    <Form onSubmit={handleRegister} ref={form} className="w-full flex flex-col gap-4">
    {!successful && (
      <div className="flex items-start flex-col justify-start">
        <div className="w-full">
          <label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">First Name:</label>
          <Input type="text" id="firstName" name="firstName" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" value={firstName} onChange={onChangeFirstName} validations={[required]}/>
          
          <label htmlFor="lastName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Last Name:</label>
          <Input type="text" id="lastName" name="lastName" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" value={lastName} onChange={onChangeLastName} validations={[required]}/>


          <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
          <Input type="text" id="username" name="username" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" value={username} onChange={onChangeUsername} validations={[required, vusername]}/>
          
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
          <Input type="text" id="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]}/>
          
          <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
          <Input type="password" id="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]}/>
        

          <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
          <Input type="text" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" value={phone} onChange={onChangePhone} validations={[required]}/>


          <label htmlFor="address" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Address:</label>
          <Input type="text" id="address" name="address" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" value={address} onChange={onChangeAddress} validations={[required]}/>

        </div>
      </div>
    )}
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
      {!successful &&(<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Register</button>)}
    </Form>
    {!successful &&(<div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
        <Link to={"/login"} className="text-blue-500 hover:text-blue-600">Login</Link>
      </div>)}
    </div>
  );
};

export default Register;
