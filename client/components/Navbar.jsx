import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext.jsx';

import DropdownItem from './navbar/DropdownItem.jsx';
import DropdownMenu from './navbar/DropdownMenu.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { user } = useContext(UserContext);
  const [boardList, setBoardList] = useState([]);

  const [currBoardName, setCurrBoardName] = useState('');
  const [inputValue, setInputValue] = useState(currBoardName);

  const navigate = useNavigate();
  // fetch call to grab all boards for the user
  // useEffect(() => {
  //   axios
  //     .post('/api/users/getBoards', { id: user._id })
  //     .then((res) => {
  //       const list = res.data.rows;
  //       setBoardList(list);
  //       // setCurrBoardID(list[0]._id);
  //       const currentBoard = list.find((board) => board._id === currBoardID);
  //       setCurrBoardName(currentBoard.name);
  //       setInputValue(currentBoard.name);
  //     })
  //     .catch((error) => console.error(error));
  // }, [currBoardID]);

  // the boards mapped from the server

  // show board 1 in currBoardId

  return (
    <nav className={`navbar`}>
      <ul className='navbar-nav'>
        <li>
          <button onClick={() => navigate('/')}>Home</button>
        </li>
        <DropdownMenu boardList={boardList} />
      </ul>
    </nav>
  );
};

export default Navbar;
