import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
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
