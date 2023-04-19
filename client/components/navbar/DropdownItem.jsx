import React, { useState, useContext } from 'react';

function DropdownItem({ boardName, close }) {
  return (
    <li>
      <button
        className='dropdown-link'
        onClick={() => {
          close();
          // console.log(currBoardID)
        }}
      >
        {boardName}
      </button>
    </li>
  );
}

export default DropdownItem;
