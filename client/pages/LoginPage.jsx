import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const refreshUser = JSON.parse(sessionStorage.getItem('user'));

  const navigate = useNavigate();

  useEffect(() => {
    if (user || refreshUser) {
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
        setUser(newUser);
        setUsername('');
        setPassword('');
        sessionStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

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
