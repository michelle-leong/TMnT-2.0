import React, { useState } from "react";
import { Link } from "react-router-dom";


function DropdownMenu(props) {
  const [open, setOpen] = useState(false);

  const handleCreateBoard = () => {
    fetch('/board/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // include any data you need to send with the request
      })
    })
      .then(response => response.json())
      .then(data => {
        // handle the response data here
        console.log(data);
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });
  };

  const handleMenuClick = (event) => {
    event.preventDefault();
    setOpen(!open);
  };


  return (
    <div className="dropdown">
      <a href="#" onClick={() => setOpen(!open)}>Profile</a>
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