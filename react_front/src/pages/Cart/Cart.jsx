import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./cart.css";
import { createOrder } from "../../redux/reducers/ordersReducer";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../../redux/reducers/cartReducer";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const [addressForm, setAddressForm] = useState({
    city: "",
    barangay: "",
    address: "",
  });

  function handleAddressFormChange(e) {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOrder() {
    let orders = JSON.parse(JSON.stringify(cart));

    const order = {
      orders: orders,
      city: addressForm.city,
      barangay: addressForm.barangay,
      address: addressForm.address,
    };
    let token = localStorage.getItem("token");
    const res = await dispatch(createOrder({ order, token }));
    if (res.type === "orders/createOrder/fulfilled") {
      alert("Order created successfully");
    }
    dispatch(clearCart())
  }
  return (
    <div className="cart-container">
      <Link to="/order" style={{ color: "black" }}>
        <button className="order-button" style={{ marginTop: "1rem" }}>
          Back to Order
        </button>
      </Link>
      <Link to="/my-orders">
        <button className="order-button" style={{ marginTop: "1rem" }}>
          Check my orders
        </button>
      </Link>
      {cart.map((item) => {
        return (
          <>
            <div className="cart-item-container" key={item.food_id}>
              <div className="cart-item-name">{item.food_name}</div>
              <div className="cart-item-price">{item.price * item.quantity} PHP</div>
              <div className="quantity-wrapper">
                <RemoveCircleOutlineIcon
                  className="quantity-button"
                  onClick={() => dispatch(decreaseQuantity(item))}
                />
                <div className="cart-item-quantity">{item.quantity}</div>
                <ControlPointIcon
                  className="quantity-button"
                  onClick={() => dispatch(increaseQuantity(item))}
                />
              </div>
            </div>
          </>
        );
      })}
      <div className="total-price-container">
        <h2>Total</h2>
        <div className="total-price">
          {cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
          }, 0)}{" "}
          PHP
        </div>
      </div>
      <form className="cart-form">
        <h2>Your Address</h2>
        <input
          type="text"
          placeholder="City"
          name="city"
          required
          value={addressForm.city}
          onChange={(e) => handleAddressFormChange(e)}
        />
        <input
          type="text"
          placeholder="Barangay"
          name="barangay"
          required
          value={addressForm.barangay}
          onChange={(e) => handleAddressFormChange(e)}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          required
          value={addressForm.address}
          onChange={(e) => handleAddressFormChange(e)}
        />
      </form>
      <button className="order-button cart-item-order" onClick={handleOrder}>
        Order
      </button>
    </div>
  );
}

export default Cart;
