import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getSelf } from "../redux/reducers/usersReducer";
import "../styles/orderheader.css";

const OrderHeader = () => {
  // const dispatch = useDispatch();
  // const currentToken = useSelector((state) => state.users.currentToken);
  // const currentUser = useSelector((state) => state.users.currentUser);
  // useEffect(() => {
  //   console.log("currentToken", currentToken);
  //   dispatch(getSelf(currentToken));
  // }, [currentToken]);
  function handleLogout() {
    localStorage.removeItem("token");
  }
  return (
    <div className="navigation-container">
      <header className="order-header">
        <span className="name"></span>

        <div className="cart-profile">
          <div className="addToCart">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>

          <div className="select-menu">
            <div className="select-btn">
              <Link to="/">
                {" "}
                <span className="sBtn-text" style={{ color: "black" }} onClick={handleLogout}>
                  Log Out
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default OrderHeader;
