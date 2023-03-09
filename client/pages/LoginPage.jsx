import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { Link, Navigate } from "react-router-dom";

function LoginPage() {
  // useState for username, password
  // loggedIn checked cookie/session id to bypass login page and redirects them to home page
  // Navigate to /home endpoint
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLogin] = useState(false);

  // check to see if user has a cookie already
  useEffect(() => {
    const userId = getCookie("userId"); // get userid from cookie sent from backend.
    if (userId) {
      // fetch user data using the userId
      fetch(`/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          Navigate("/");
        });
    }
  }, []);

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username: username, password: password };
    // axios?
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (res.status === 404) {
          setLogin(false);
        } else {
          setLogin(true);
          // set the userId cookie with the user's id
          fetch(`/api/users?username=${username}`)
            .then((res) => res.json())
            .then((data) => {
              document.cookie = `userId=${data._id}`; // depends on the data we get back from backend
              setUser(data);
              navigate("/home");
            })
            .catch((error) => {
              console.log("Error fetching user data:", error);
            });
        }
        console.log("logged in on LoginPage.jsx");
      })
      .catch((error) => {
        console.log("incorrect username or password", error);
      });
  };

  // getCookie function
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  //RENDER
  return (
    <div className="loginCont">
      <div className="user-login-box">
        <h1 className="login-header">Welcome! Sign in here! </h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formLine">
            <label className="login-text" htmlFor="username">
              Username/Email
            </label>
            <input
              className="user-input"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formLine">
            <label className="login-text" htmlFor="password">
              Password
            </label>
            <input
              className="user-input"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit">Login</button>
        </form>
        <div className="login-footer">
          Don't have an Account? <Link to="/signup">Sign up here!</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
