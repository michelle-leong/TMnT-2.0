import React, { useState } from "react";
import { Link } from "react-router-dom";


function DropdownItem(props) {
  return (
    <li>
      <Link
        to={props.link}
        className="dropdown-link"
        onClick={() => props.setOpen(false)}
      >
        {props.children}
      </Link>
    </li>
  );
}

export default DropdownItem;