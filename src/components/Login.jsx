import React, { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-quartenary dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 mb-36 bg-opacity-70 backdrop-filter backdrop-blur-md dark:backdrop-filter dark:bg-opacity-70 dark:backdrop-blur-md bg-tertiary dark:bg-[#111829] rounded-lg shadow-md px-16 py-28 flex flex-col items-center">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <h1 className="text-xl text-center text-quartenary dark:text-gray-200 mb-8">
        Welcome to Coffee & Plates
      </h1>
      <Form
        onSubmit={handleLogin}
        ref={form}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex items-start flex-col justify-start">
          <div className="w-full">
            <label
              htmlFor="username"
              className="text-sm text-quartenary dark:text-gray-200 mr-2"
            >
              Username:
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-600 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
            <label
              htmlFor="password"
              className="text-sm text-quartenary dark:text-gray-200 mr-2"
            >
              Password:
            </label>
            <Input
              type="password"
              id="password"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-600 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
        </div>
        {message && (
          <div className="text-sm text-center text-gray-700 dark:text-gray-200 mb-8">
            <div
              className="bg-red-500 text-white font-bold rounded-lg border border-white shadow-lg p-5"
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
        <button
          className={`bg-quartenary hover:bg-tertiary text-secondary font-medium py-2 px-4 rounded-md shadow-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading && (
            <div>
              <span className="animate-spin mr-1 h-4 w-4 border-t-2 border-b-2 border-white rounded-full inline-block"></span>
            </div>
          )}
          <span>Login</span>
        </button>
      </Form>
      <div className="mt-4 text-center">
        <span className="text-sm text-quartenary dark:text-gray-300">
          Don't have an account yet?{" "}
        </span>
        <Link to={"/register"} className="text-tertiary hover:text-quartenary">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
