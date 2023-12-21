import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./login.css";
import { loginUser } from "../../redux/reducers/usersReducer";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const hideMainContainer = () => {
    // Implement the logic to hide the main container
  };
  const navigate = useNavigate();

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const toggleContainers = () => {
    // Implement the logic to toggle containers
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: userpassword,
    };
    const response = await dispatch(loginUser(user));
    if (response.type === "users/loginUser/fulfilled") {
      localStorage.setItem("token", response.payload.token);
      if (response.payload.message === "Welcome admin") {
        navigate("/admin");
      } else {
        navigate("/order");
      }
    }
  }

  return (
    <>
      <section
        className="main-container"
        id="main-container"
        onClick={hideMainContainer}
      >
        <div
          className="signin-container"
          id="signin-container"
          onClick={(event) => stopPropagation(event)}
        >
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                name="userpassword"
                required
                onChange={(e) => setUserpassword(e.target.value)}
              />
              <span></span>
              <label>Password</label>
            </div>
            <div className="pass">Forgot Password?</div>
            <button className="login-btn" type="submit">
              Login
            </button>
            <div className="signup_link">
              <h3>
                Not a member? <Link to="/signup">Sign Up</Link>
              </h3>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
