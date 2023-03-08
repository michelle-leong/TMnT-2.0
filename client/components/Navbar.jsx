import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';

const Navbar = () = {
  const



  return (
    <nav className="navbar" >
      <ul className="navbar-nav" >
        <li>
          <Link
            to="/"
            onClick={() => handleLinkClick('home')}
            className={activeLink === 'home' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;