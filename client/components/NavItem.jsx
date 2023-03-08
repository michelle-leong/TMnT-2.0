import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ icon, link, activeLink, handleLinkClick, children }) => {
  return (
    <li className="nav-item">
      <Link
        to={link}
        onClick={() => handleLinkClick(link)}
        className={activeLink === link ? 'active' : ''}
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}

export default NavItem;
