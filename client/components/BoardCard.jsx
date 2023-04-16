import React, { useContext } from 'react';
import BoardContext from '../context/BoardContext.jsx';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ name, id }) => {
  const { setCurrBoardID } = useContext(BoardContext);

  const navigate = useNavigate();
  const handleClick = (id) => {
    setCurrBoardID(id);
    navigate(`/boards/${id}`);
  };

  return (
    <div>
      <button className='board-button' onClick={() => handleClick(id)}>
        {name}
      </button>
    </div>
  );
};

export default BoardCard;
