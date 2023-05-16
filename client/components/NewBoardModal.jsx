import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext.jsx';

const NewBoardModal = ({ setUserBoards, setShowModal }) => {
  const { user } = useContext(UserContext);
  const [boardName, setBoardName] = useState('');

  const handleSubmit = () => {
    axios
      .post('/api/boards/create', {
        id: user._id,
        name: boardName,
      })
      .then((res) => {
  
        setUserBoards((prev) => {
          return [...prev, res.data];
        });
        setBoardName('');
      });
    setShowModal(false);
  };

  return (
    <div className='modal-home'>
      <form className='modal-form'>
        <h1>Board Name: </h1>
        <input
          className='modal-input'
          type='text'
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <div className='modal-button-cont'>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewBoardModal;
