import React, { useState, useContext } from "react";
import BoardContext from "../../pages/BoardContext.jsx";

function DropdownItem(props) {
  const { currBoardID, setCurrBoardID } = useContext(BoardContext);

  return (
    <li>
      <button
        className="dropdown-link"
        onClick={() => {
          // props.setOpen(false);
          setCurrBoardID(props.boardID);
          // console.log(currBoardID)
        }}
      >
        {props.children}
      </button>
    </li>
  );
}


// function DropdownItem(props) {
//   return (
//     <li>
//       <Link
//         to={props.link}
//         className="dropdown-link"
//         onClick={() => props.setOpen(false)}
//       >
//         {props.children}
//       </Link>
//     </li>
//   );
// }

export default DropdownItem;