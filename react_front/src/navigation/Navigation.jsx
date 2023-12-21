import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../pages/Home/Home"
import SignUp from "../pages/SignUpPage/SignUp"
import Login from "../pages/Login/Login"
import OrderPage from "../pages/Order/OrderPage"
import Cart from "../pages/Cart/Cart"
import AdminPage from "../pages/Admin/AdminPage"
import OrderDetail from "../pages/OrderDetail/OrderDetail"
import OwnOrders from "../pages/OwnOrders/OwnOrders"
import OwnOrderDetail from "../pages/OwnOrderDetail/OwnOrderDetail"

const Navigation = ()=>{
    return(
    
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Home/>}/> 
            <Route path="/signup" element = {<SignUp/>}/>       
            <Route path="/login" element = {<Login/>}/>
            <Route path="/order" element = {<OrderPage/>}/>
            <Route path="/cart" element = {<Cart/>}/>
            <Route path="/admin" element = {<AdminPage/>}/>
            <Route path="/orders/:id" element = {<OrderDetail/>}/>
            <Route path="/my-orders" element = {<OwnOrders/>}/>
            <Route path="/my-orders/:id" element = {<OwnOrderDetail/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Navigation;