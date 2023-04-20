import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import UserContext from '../context/UserContext.jsx';
import BoardCard from '../components/BoardCard.jsx';
import NewBoardModal from '../components/NewBoardModal.jsx';

const HomePage = () => {
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
      <div id='home-page'>
        {showModal && (
          <div className='modal-box'>
            <NewBoardModal
              setUserBoards={setUserBoards}
              setShowModal={setShowModal}
            />
          </div>
        )}

        <div id='home-page-buttons'>
          <div id='board-list-header'>
            <h1>My Boards</h1>
            <button onClick={() => setShowModal(true)}>+</button>
          </div>
          <div id='board-list-container'>{boardEle}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
