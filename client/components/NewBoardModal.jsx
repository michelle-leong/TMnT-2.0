import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext.jsx';

const NewBoardModal = ({ setUserBoards, setShowModal }) => {
  const { user } = useContext(UserContext);
  const [boardName, setBoardName] = useState('');

  const handleSubmit = () => {
    axios
      .post('/api/boards/create', {
        id: user.id,
        name: boardName,
      })
      .then((res) => {
        console.log(res.data);
        setUserBoards((prev) => {
          return [...prev, res.data];
        });
        setBoardName('');
      });
    setShowModal(false);
  };

  return (
    <div>
      <label>Board Name: </label>
      <input
        type='text'
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewBoardModal;
