import React, { useState } from "react";
import { Link } from "react-router-dom";
// import NavItem from './NavItem';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <ul className="navbar-nav">
        <NavItem
          link="/"
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
        >
          Home
        </NavItem>
        <input type="text" name="input-box" />
       
        <NavItem>
          <DropdownMenu>
            <DropdownItem link="/table1">Table 1</DropdownItem>
            <DropdownItem link="/table2">Table 2</DropdownItem>
            <DropdownItem link="/table3">Table 3</DropdownItem>
            <DropdownItem link="/table4">Table 4</DropdownItem>
          </DropdownMenu>
        </NavItem>

        <li className="theme-toggle">
          <button onClick={handleThemeToggle}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

const NavItem = ({ link, activeLink, handleLinkClick, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <li className="nav-item">
      <Link
        to={link}
        className={activeLink === link ? "active" : ""}
        onClick={() => handleLinkClick(link)}
      >
        {children}
      </Link>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-menu-list">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                setOpen: setDropdownOpen,
                setNavItemActive: handleLinkClick,
              });
            })}
          </ul>
        </div>
      )}
    </li>
  );
};



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

export default Navbar;
