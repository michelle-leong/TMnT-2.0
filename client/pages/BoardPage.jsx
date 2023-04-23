import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import UserContext from '../context/UserContext.jsx';
import Board from '../components/Board.jsx';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <div id='board-page'>
      <Navbar />
      <Board />
    </div>
  );
};

export default BoardPage;
