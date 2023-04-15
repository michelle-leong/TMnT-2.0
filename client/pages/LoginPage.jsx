import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  // useState for username, password
  // loggedIn checked cookie/session id to bypass login page and redirects them to home page
  // Navigate to /home endpoint
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // check to see if user has session running
  // useEffect(() => {
  //   const sessionID = getCookie("sessionID");
  //   if (sessionID) {
  //     axios
  //       .get(`/api/users/session/${sessionID}`)
  //       .then((response) => {
  //         setUser(response.data);
  //         navigate("/home");
  //       })
  //       .catch((error) => {
  //         console.log("Error checking session:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (user !== null) {
      console.log('User context:', user);
      navigate('/home');
    }
  }, [user]);

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username: username, password: password };

    axios
      .post('/api/users/login', loginData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        const newUser = res.data;
        console.log(newUser);
        setUser(newUser);
        setUsername('');
        setPassword('');
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  //RENDER
  return (
    <div className='loginCont'>
      <div className='user-login-box'>
        <h1 className='login-header'>Welcome! Sign in here! </h1>
        <form className='loginForm' onSubmit={handleSubmit}>
          <div className='formLine'>
            <label className='login-text' htmlFor='username'>
              Username/Email
            </label>
            <input
              className='user-input'
              type='text'
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='formLine'>
            <label className='login-text' htmlFor='password'>
              Password
            </label>
            <input
              className='user-input'
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='submit'>Login</button>
        </form>
        <div className='login-footer'>
          Don't have an Account? <Link to='/signup'>Sign up here!</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
