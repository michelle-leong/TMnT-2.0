import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <div className='dropdown'>
      <span className='profile-link' onClick={() => setOpen(!open)}>
        Welcome {user ? user.first_name : null}!
      </span>
      {open && (
        <ul className='dropdown-menu'>
          <li>
            <button className='logOut' onClick={logOut}>
              LOG OUT
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
