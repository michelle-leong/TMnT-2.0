import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setUser } = useContext(UserContext);

  const refreshUser = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!refreshUser) {
      navigate('/');
    } else {
      setUser(refreshUser);
    }
  }, []);

  return (
    <nav className={`navbar`}>
      <ul className='navbar-nav'>
        <li>
          <button onClick={() => navigate('/home')}>Home</button>
        </li>
        <DropdownMenu />
      </ul>
    </nav>
  );
};

export default Navbar;
