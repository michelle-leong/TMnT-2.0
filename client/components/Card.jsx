import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UpdateCardModal } from './Modals.jsx';
import axios from 'axios';

const Card = ({ card, dropIndex, setColumns, columnId }) => {
  const { card_id, card_task } = card;

  const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);

  //handle deleting cards
  const handleDelete = () => {
    axios
      .delete(`/api/cards/delete`, {
        data: { id: card_id },
      })
      .then((response) => {
        if (response.status === 200) {
          setColumns((prevState) => {
            const stateCopy = prevState.slice();
            const columnIndex = stateCopy.findIndex(
              (column) => column.column_id === columnId
            );
            const column = stateCopy[columnIndex];

            const cardIndex = column.cards.findIndex(
              (card) => card.card_id === card_id
            );
            column.cards.splice(cardIndex, 1);
            return stateCopy;
          });
        }
      });
  };

  return (
    <Draggable key={card_id} draggableId={card_id.toString()} index={dropIndex}>
      {(provided) => (
        <div className='card-content-container'>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='card'
          >
            <p>{card_task}</p>
            <div className='modal-button-cont'>
              <button
                className='btn'
                onClick={() => setShowUpdateCardModal(true)}
              >
                Update
              </button>
              <button className='btn' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className='modal-box'>
            {showUpdateCardModal && (
              <UpdateCardModal
                card_id={card_id}
                setShowUpdateCardModal={setShowUpdateCardModal}
                columnId={columnId}
                setColumns={setColumns}
                cardTask={card_task}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
