import React, { useEffect, useState } from "react";
// import "../styles.css";
import { SignUpForm, SignInForm } from ".";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Login() {
  const navigate = useNavigate();

  const [changePage, setChangePage] = useState(false)
  useEffect(() => {
    axios.get('https://localhost:7082/api/Parts', {})
        .then(response => useState);
  }, [])
  useEffect(() => {
    if (changePage === true) {
      navigate('./AllProducts')
      alert('frgt')
    }
  }, [changePage]);

  const [arrUsers, setArrUsers] = useState([{ name: "noa", email: "123@gmail", pass: "123" }
    , { name: "dini", email: "dini@gmail", pass: "222" },
  { name: "michal", email: "333@gmail", pass: "333" }
    , { name: "ztipi", email: "555@gmail", pass: "555" }]);
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm users={arrUsers} />
        <SignInForm setChngePage={setChangePage} changePage={changePage} users={arrUsers} setArrUsers={setArrUsers} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
