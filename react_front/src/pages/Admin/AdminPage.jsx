import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getAllOrders } from "../../redux/reducers/ordersReducer";
import { getAllUsers } from "../../redux/reducers/usersReducer";
import "./AdminPage.css";
import { setCurrentOrder } from "../../redux/reducers/ordersReducer";
import { modifyOrder } from "../../redux/reducers/ordersReducer";

function AdminPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersReducer.orders);
  const users = useSelector((state) => state.usersReducer.users);
  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(getAllOrders(token));
    dispatch(getAllUsers(token));
  }, []);

  function finishedHandler(order_id) {
    let token = localStorage.getItem("token");
    dispatch(modifyOrder({ order_id, token }));
  }

  return (
    <div>
      <h2 style={{ marginLeft: "3rem", marginTop: "1rem" }}>Admin Page</h2>
      <div className="orders-container">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          All Orders
        </h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Order Address</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {console.log(orders)}
            {orders.map((order) => {
              return (
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  {order.status === "preparing" ? (
                    <select onChange={() => finishedHandler(order.order_id)}>
                      <option value="preparing">Preparing</option>
                      <option
                        value="finished"
                      >
                        Finished
                      </option>
                    </select>
                  ) : (
                    <td>{order.status}</td>
                  )}
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{order.address}</td>
                  <td>
                    <Link
                      className="order-details-button"
                      onClick={() => dispatch(setCurrentOrder(order.order_id))}
                      to={`/orders/${order.order_id}`}
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
      <div className="users-container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          All Customers
        </h2>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {console.log(users)}
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.customer_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
