import React, { useState, useContext } from "react";
import BoardContext from "../../pages/BoardContext.jsx";
import UserContext from "../../UserContext.jsx";
import axios from "axios";

function DropdownMenu(props) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { currBoardID, setCurrBoardID } = useContext(BoardContext);

  const handleCreateBoard = () => {
    axios.post('/api/boards/create', {
      name: 'New Board', // You can replace this with any name you want for the new board
      id: user._id 
    })
    .then(response => {
      // handle the response data here
      console.log(response.data);
      // Add the newly created board to the board list
      const newBoard = response.data;
      
      // Set the latest created board as the current board
      setCurrBoardID(newBoard._id);
    })
    .catch(error => {
      // handle errors here
      console.error(error);
    });
  };

  const handleProfileClick = () => {
    setOpen(!open);
  };
  
  return (
    <div className="dropdown">
      <span className="profile-link" onClick={handleProfileClick}>profile</span>
      {open && (
        <ul className="dropdown-menu">
          {props.children}
          <li>
            <button onClick={handleCreateBoard}>Create new board</button>
          </li>
          <li>
            <button className="logOut" onClick={() => props.setLogin(false)}>
              LOG OUT
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;