import React from 'react';

import { useNavigate } from 'react-router-dom';

const BoardCard = ({ name, id }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
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
