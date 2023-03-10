import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../UserContext.jsx';
import BoardContext from '../pages/BoardContext.jsx';
import NavItem from './navbar/NavItem.jsx';
import DropdownItem from './navbar/DropdownItem.jsx';
import DropdownMenu from './navbar/DropdownMenu.jsx';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { user } = useContext(UserContext);
  const [boardList, setBoardList] = useState([]);
  const { currBoardID, setCurrBoardID } = useContext(BoardContext);
  const [currBoardName, setCurrBoardName] = useState('');
  const [inputValue, setInputValue] = useState(currBoardName);

  // fetch call to grab all boards for the user
  useEffect(() => {
    axios
      .post('/api/users/getBoards', { id: user._id })
      .then((res) => {
        const list = res.data.rows;
        setBoardList(list);
        // setCurrBoardID(list[0]._id);
        const currentBoard = list.find((board) => board._id === currBoardID);
        setCurrBoardName(currentBoard.name);
        setInputValue(currentBoard.name);
      })
      .catch((error) => console.error(error));
  }, [currBoardID]);

  // darkmode
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // the boards mapped from the server

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    const boardToUpdate = boardList.find((board) => board._id === currBoardID);
    axios
      .patch(`/api/boards/update`, { id: boardToUpdate._id, name: inputValue })
      .then(() => {
        setCurrBoardName(inputValue);
        const updatedBoardList = boardList.map((board) => {
          if (board._id === currBoardID) {
            return { ...board, name: inputValue };
          }
          return board;
        });
        setBoardList(updatedBoardList);
      })
      .catch((error) => console.error(error));
  };

  // show board 1 in currBoardId

  return (
    <nav className={`navbar`}>
      <ul className='navbar-nav'>
        <DropdownMenu boardList={boardList} />
        <input
          type='text'
          className='board-name-input'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className='board-name-save-button' onClick={handleSaveClick}>
          Save
        </button>

        <li className='theme-toggle'>
          <button onClick={handleThemeToggle}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
