import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/header.css"


const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [headerActive, setHeaderActive] = useState(false);
  const [scrollUpBtnActive, setScrollUpBtnActive] = useState(false);

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCloseMenuBtn = () => {
    handleToggleMobileMenu();
  };

  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    setHeaderActive(scrollY > 5);
    setScrollUpBtnActive(scrollY > 250);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMobileMenu]);

  return (
    <header className="header-landing">
      <nav className={`navbar ${showMobileMenu ? "show-mobile-menu" : ""}`}>
        <a className="logo" href="#">
          Dubby's<span>.</span>
        </a>
        <ul className="menu-links">
          <span
            id="close-menu-btn"
            className="material-symbols-outlined"
            onClick={handleCloseMenuBtn}
          >
            close
          </span>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#about">About</Link>
          </li>
          <li>
            <Link to="#menu">Menu</Link>
          </li>
          <li>
            <Link to="#review">Review</Link>
          </li>
          <li>
            <Link to="#contact">Contact Us</Link>
          </li>
        </ul>
        <div className="buttons">
          <Link to="/login" className="signin">
            Sign In
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </div>
        <span
          id="hamburger-btn"
          className="material-symbols-outlined"
          onClick={handleToggleMobileMenu}
        >
          menu
        </span>
      </nav>
    </header>
  );
};

export default Header;
