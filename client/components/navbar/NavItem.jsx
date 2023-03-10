import React, { useState } from "react";

const NavItem = ({ onClick, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <li className="nav-item">
      <div
        className="nav-link"
        onClick={() => {
          handleDropdownClick();
        }}
      >
        {children}
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-menu-list">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                setOpen: setDropdownOpen,
              });
            })}
          </ul>
        </div>
      )}
    </li>
  );
};


export default NavItem;
