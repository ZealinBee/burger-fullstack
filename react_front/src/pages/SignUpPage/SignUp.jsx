import React from "react";
import { useState, useEffect } from "react";
import "./signup.css";

import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/reducers/usersReducer";

const SignUp = () => {
  const [usernameInput, setUsername] = useState("");
  const [emailInput, setEmail] = useState("");
  const [mobileNumberInput, setMobileNumber] = useState("");
  const [passwordInput, setPassWord] = useState("");
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: usernameInput,
      email: emailInput,
      mobile_number: mobileNumberInput,
      password: passwordInput,
    };
    dispatch(signUpUser(user));
  };

  return (
    <section 
    >
      <div
        className="signup-container"
        id="signup-container"
        onClick={(event) => stopPropagation(event)}
      >
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Username:</label> {/* no more than 50 letters */}
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              pattern=".{1,50}"
              title="Username must be between 1 and 50 characters"
              required
            />
          </div>
          <div className="input-box">
            <label>Email:</label> {/* valid email format */}
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-box">
            <label>Mobile Number:</label> {/* exactly 11 digits */}
            <input
              type="text"
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
              pattern="\d{11}"
              title="Mobile Number must be exactly 11 digits"
              required
            />
          </div>
          <div className="input-box">
            <label>Password:</label> {/* no more than 50 characters */}
            <input
              type="password"
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
              pattern=".{1,50}"
              title="Password must be between 1 and 50 characters"
              required
            />
          </div>
          <div className="input-box">
            <label>Confirm Password:</label> {/* should match the password */}
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmpassword"
              name="confirmpassword"
              // onChange={(e) => {
              //   setConfirmPassword(e.target.value);
              // }}
              // pattern={passWord} // Ensure it matches the password
              title="Passwords must match"
              required
            />
          </div>
          <p id="confirmation"></p>
          <div class="policy">
            <input type="checkbox" id="accept-checkbox" />
            <h3 onclick="togglePolicyDetails()">
              I accept all terms & conditions
            </h3>
          </div>
          <div class="input-box">
            <button type="submit" class="register-btn">
              Create Account
            </button>
          </div>
          <div class="text">
            <h3>
              {/* Already have an account? <a onClick="toggleContainers()">Login</a> */}
            </h3>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
