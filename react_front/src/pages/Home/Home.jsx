import React, { useState } from "react";

import Hero from "../../components/Hero";
import About from "../../components/About";
import Menu from "../../components/Menu";
import Reviews from "../../components/Reviews";
import Contacts from "../../components/Contacts";
import Header from "../../components/Header";
import SignUp from "../SignUpPage/SignUp";

import "./home.css";
// import "./hero.module.css"
// import "./about.module.css"
// import "./menu.module.css"
// import "./about.module.css"
// import "./auth.module.css"
// import "./contact.module.css"

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Contacts />
    </>
  );
};

export default Home;
