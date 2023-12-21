import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/menu.css";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const selectedFoodIds = [1, 5, 9, 14];

  useEffect(() => {
    fetch("http://localhost:5555/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((allFoods) => {
        // Filter the fetched menu items based on selectedFoodIds
        const filteredFoods = allFoods.filter((food) =>
          selectedFoodIds.includes(food.food_id)
        );
        setFoods(filteredFoods);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  return (
    <>
      <section id="menu" className="section menu">
        <div className="menu-header">
          <span className="title">Our Menu</span>
          <span className="sub-title">Our Popular Menu</span>
        </div>
        <div className="menu-container">
          {foods.map((food) => (
            <div className="container" key={food.food_id}>
              <div className="canvas" style={{marginTop:"0.25rem", marginBottom:"1rem"}}>
                <img
                  src={food.image}
                  alt={food.food_name}
                  className="food-img"
                />
              </div>

              <div className="product-name">{food.food_name}</div>

              <div className="product-description">
                <p>{food.description}</p>
              </div>

              <div className="product-info">
                <div className="product-cost">P{food.price}</div>
                <Link to="/login" className="order-button">
                  Order now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;
