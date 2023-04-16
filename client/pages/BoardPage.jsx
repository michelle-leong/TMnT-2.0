import React, { useContext } from 'react';
import Navbar from '../components/Navbar.jsx';
import UserContext from '../context/UserContext.jsx';
import Board from '../components/Board.jsx';

const BoardPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Navbar />

      <Board />
    </div>
  );
};

export default BoardPage;
