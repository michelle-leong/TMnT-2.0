import React, { useState } from "react";
import { Link } from "react-router-dom";

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

export default NavItem;
