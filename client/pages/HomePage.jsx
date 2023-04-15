import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import UserContext from '../context/UserContext.jsx';
import BoardCard from '../components/BoardCard.jsx';

const HomePage = () => {
  // temp setting as board 2 for testing
  // const [currBoardID, setCurrBoardID] = useState(null);
  const { user } = useContext(UserContext);
  const [userBoards, setUserBoards] = useState([]);

  // console.log(user);
  useEffect(() => {
    axios
      .post('/api/users/getBoards', {
        id: user.id,
      })
      .then((res) => {
        setUserBoards(res);
      });
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default HomePage;
