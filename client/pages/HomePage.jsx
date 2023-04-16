import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import UserContext from '../context/UserContext.jsx';
import BoardCard from '../components/BoardCard.jsx';
import NewBoardModal from '../components/NewBoardModal.jsx';

const HomePage = () => {
  // temp setting as board 2 for testing
  // const [currBoardID, setCurrBoardID] = useState(null);
  const { user } = useContext(UserContext);
  const [userBoards, setUserBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // console.log(user);
  useEffect(() => {
    axios
      .post('/api/users/getBoards', {
        id: user.id,
      })
      .then((res) => {
        setUserBoards(res.data);
      });
  }, []);

  const boardEle = userBoards.map((ele, idx) => {
    return <BoardCard key={idx} name={ele.name} id={ele._id} />;
  });

  return (
    <div>
      <Navbar />
      <button onClick={() => setShowModal(!showModal)}>Create New Board</button>
      {showModal && (
        <NewBoardModal
          setUserBoards={setUserBoards}
          setShowModal={setShowModal}
        />
      )}
      {boardEle}
    </div>
  );
};

export default HomePage;
