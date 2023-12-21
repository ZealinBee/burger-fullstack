import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMyOrders } from "../../redux/reducers/ordersReducer";
import { setCurrentOrder } from "../../redux/reducers/ordersReducer";

function OwnOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersReducer.orders);
  useState(() => {
    let token = localStorage.getItem("token");
    dispatch(getMyOrders(token));
  }, []);
  return (
    <div>
      {orders.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
            <Link to="/cart" className="order-details-button">Back</Link>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            My Orders
          </h2>
          <table>
            {console.log(orders)}
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Status</th>
                <th>Order Date</th>
                <th>Order Address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr>
                    <td>{order.order_id}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.address}</td>
                    <td>
                      <Link
                        to={`/my-orders/${order.order_id}`}
                        className="order-details-button"
                        onClick={() =>
                          dispatch(setCurrentOrder(order.order_id))
                        }
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OwnOrders;
