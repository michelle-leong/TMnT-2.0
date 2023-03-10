import React, { useState, useContext } from 'react';
import BoardContext from '../../pages/BoardContext.jsx';

function DropdownItem({ boardID, boardName, close }) {
  const { currBoardID, setCurrBoardID } = useContext(BoardContext);

  return (
    <li>
      <button
        className='dropdown-link'
        onClick={() => {
          setCurrBoardID(boardID);
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
