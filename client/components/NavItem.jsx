import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);


  return (
    <li>className="nav-item" 
      <a href="#" className="icon-button" onClick={() => setOpen(!open)} >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  function DropdownItem() {
    return {
      <a > 
      
      </a>
    }
  }
  return (
    <div className='dropdown'>
      
    </div>
  );
}

export default NavItem;