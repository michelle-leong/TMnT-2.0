import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../UserContext.jsx";
// import NavItem from "./navbar/NavItem.jsx";
// import DropdownMenu from "./navbar/DropdownMenu.jsx";
// import DropdownItem from "./navbar/DropdownItem.jsx";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [activeLink, setActiveLink] = useState("home");
  const { user } = useContext(UserContext);
  const [boardList, setBoardList] = useState([]);
  // need a fetch call to grab all boards


  useEffect(() => {
    axios.post('/api/users/getBoards', { id: user._id })
      .then(res => {
        setBoardList(res.data);
        console.log(user);
      })
      .catch(error => console.error(error));
  }, [user._id]);


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // make another fetch request to get the board with the given boardID
  // const handleBoardSelect = (boardID) => {
  //   axios.get(`/api/board/${boardID}`)
  //     .then(res => {
  //       // handle the response data here and update the state to render the board
  //       console.log(res.data);
  //     })
  //     .catch(error => console.error(error));
  // };

  // the boards mapped from the server
  const boardOptions = Array.isArray(boardList) && boardList.map(board => (
    <DropdownItem link="#" onClick={() => handleBoardSelect(board._id)}>{board.name}</DropdownItem>
  ));
  

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
            {boardOptions}
          </DropdownMenu>
        </NavItem>

        {/* <NavItem>
          <DropdownMenu>
            <DropdownItem link="/table1">Table 1</DropdownItem>
            <DropdownItem link="/table2">Table 2</DropdownItem>
            <DropdownItem link="/table3">Table 3</DropdownItem>
            <DropdownItem link="/table4">Table 4</DropdownItem>
          </DropdownMenu>
        </NavItem> */}

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
    axios.post('/api/board/create', {
      // include any data you need to send with the request
    })
      .then(response => {
        // handle the response data here
        console.log(response.data);
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
  const handleBoardSelect = () => {
    axios.get(`/api/board/${props.boardID}`)
      .then(res => {
        // handle the response data here and update the state to render the board
        console.log(res.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <li>
      <Link
        to={props.link}
        className="dropdown-link"
        onClick={() => {
          props.setOpen(false);
          handleBoardSelect(props.boardID);
        }}
      >
        {props.children}
      </Link>
    </li>
  );
}



export default Navbar;