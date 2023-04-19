import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext.jsx';
import axios from 'axios';

import DropdownItem from './DropdownItem.jsx';

function DropdownMenu({ boardList }) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handleCreateBoard = () => {
    axios
      .post('/api/boards/create', {
        name: 'New Board', // You can replace this with any name you want for the new board
        id: user._id,
      })
      .then((response) => {
        // handle the response data here
        console.log(response.data);
        // Add the newly created board to the board list
        const newBoard = response.data;

        // Set the latest created board as the current board
      })
      .catch((error) => {
        // handle errors here
        console.error(error);
      });
  };

  let boardOptions;
  if (Array.isArray(boardList)) {
    boardOptions = boardList.map((board) => (
      <DropdownItem boardName={board.name} close={() => setOpen(false)} />
    ));
  } else {
    boardOptions = [];
  }

  const handleProfileClick = () => {
    setOpen(!open);
  };

  return (
    <div className='dropdown'>
      <span className='profile-link' onClick={handleProfileClick}>
        profile
      </span>
      {open && (
        <ul className='dropdown-menu'>
          {boardOptions}
          <li>
            <button onClick={handleCreateBoard}>Create new board</button>
          </li>
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
