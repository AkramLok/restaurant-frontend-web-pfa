import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Header from "./Header";
import Blog from "./Blog";
import Blog2 from "./Blog2";
import AppDownload from "./AppDownload";
import Quote from "./Quote";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <Header />
      <Blog />
      <Quote />
      <AppDownload />
      <Blog2 />
    </div>
  );
};

export default Home;
