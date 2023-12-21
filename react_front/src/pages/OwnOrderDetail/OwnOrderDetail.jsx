import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOneOrder } from "../../redux/reducers/ordersReducer";
import "../OrderDetail/OrderDetail.css";

function OwnOrderDetail() {
  const currentOrderId = useSelector(
    (state) => state.ordersReducer.currentOrder
  );
  const orderDetails = useSelector((state) => state.ordersReducer.orderDetails);
  const dispatch = useDispatch();
  let subtotal = 0;

  useEffect(() => {
    console.log(currentOrderId);
    if (currentOrderId === null) return;
    let token = localStorage.getItem("token");
    console.log(currentOrderId);
    dispatch(getOneOrder({ orderId: currentOrderId, token }));
  }, []);

  return (
    <>
      <Link to="/my-orders" className="back-button">
        Back to My Orders
      </Link>
      {orderDetails.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <div className="order-details">
          {console.log(orderDetails)}
          <h2>Order Detail</h2>
          <h3>Order ID: {orderDetails[0].order_id}</h3>
          <h3>Customer ID: {orderDetails[0].customer_id}</h3>
          <h3>Order Status: {orderDetails[0].status}</h3>
          <h3>Order Items:</h3>
          <table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item) => {
                return (
                  <tr>
                    <td>{item.food_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orderDetails.map((item) => {
            subtotal += item.price * item.quantity;
          })}
          <h1>Total: {subtotal} PHP</h1>
        </div>
      )}
    </>
  );
}

export default OwnOrderDetail;
