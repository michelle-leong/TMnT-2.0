import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { user } = useContext(UserContext);
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('/api/users/getBoards', { id: user.id })
      .then((res) => {
        const list = res.data;
        setBoardList(list);
      })
      .catch((error) => console.error(error));
  }, []);

  // the boards mapped from the server

  // show board 1 in currBoardId

  return (
    <nav className={`navbar`}>
      <ul className='navbar-nav'>
        <li>
          <button onClick={() => navigate('/')}>Home</button>
        </li>
        <DropdownMenu />
      </ul>
    </nav>
  );
};

export default Navbar;
