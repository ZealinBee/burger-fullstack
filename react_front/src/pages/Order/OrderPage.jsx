import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OrderHeader from "../../components/OrderHeader";
import OrderProducts from "../../components/orderProducts";

const OrderPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <OrderHeader />
      <OrderProducts />
    </>
  );
};

export default OrderPage;
