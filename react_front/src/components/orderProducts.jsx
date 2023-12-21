import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getAllFoods } from "../redux/reducers/foodsReducer";
import { addToCart } from "../redux/reducers/cartReducer";

import "../styles/ordermenu.css";

const OrderProducts = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foodsReducer.foods);

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);

  function addToCartHandler(food) {
    dispatch(addToCart(food));
  }
  return (
    <>
      <section className="menu-container" style={{ display: "block" }}>
        <div className="category-container">
          <h2 style={{marginLeft:"1rem"}}>Menu</h2>
          <div className="product-container">
            {foods.map((food) => {
              return (
                <div className="container">
                  <div className="canvas">
                      <img src={food.image} alt={food.food_name} className="food-img"/>
                  </div>

                  <div className="food-details">
                    <div className="food-name">{food.food_name}</div>
                    <div className="food-cost">{food.price}.00PHP</div>
                  </div>
                  <div className="orderBtn-container">
                    <button
                      className="order-button"
                      onClick={() => addToCartHandler(food)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderProducts;
