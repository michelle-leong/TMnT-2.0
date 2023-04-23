import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext.jsx';

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handleProfileClick = () => {
    setOpen(!open);
  };

  return (
    <div className='dropdown'>
      <span className='profile-link' onClick={handleProfileClick}>
        Welcome {user.first_name}!
      </span>
      {open && (
        <ul className='dropdown-menu'>
          <li>
            <button className='logOut' onClick={() => props.setLogin(false)}>
              LOG OUT
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
