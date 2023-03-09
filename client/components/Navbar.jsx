import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';


const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`navbar`}>
      <ul className="navbar-nav">
        <NavItem
          link="/home"
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

export default Navbar;


