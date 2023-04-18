import React, { Component, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UpdateCardModal } from './Modals.jsx';
import axios from 'axios';

export default function Card({ card, setCards, dropIndex, setCounter }) {
  const { card_id, card_task, column_id } = card;

  const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`/api/cards/delete`, {
        data: { id: card_id },
      })
      .then((response) => {
        if (response.status === 200) {
          setCards((cardsState) => {
            const newState = cardsState.map((obj) => ({ ...obj }));
            const index = newState.findIndex(
              (cardObj) => cardObj.card_id === card_id
            );
            newState.splice(index, 1);
            console.log(newState);
            return newState;
          });
        }
      });
    setCounter((prev) => ++prev);
  };

  // open up update card modal form
  const toggle = () => {
    setShowUpdateCardModal(!showUpdateCardModal);
  };
  /**
   * useEffect after the a card is created updated deleted
   * to re render the cards
   */

  /*className={`cards ${snapshot.isDragging ? "drag" : ""}`*/
  // maybe in the Draggable code need to add task={task}??
  return (
    <Draggable key={card_id} draggableId={card_id.toString()} index={dropIndex}>
      {(provided, snapshot) => (
        <div
          className='card card-content-container'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='modal-box'>
            {showUpdateCardModal && (
              <UpdateCardModal
                card_id={card_id}
                setShowUpdateCardModal={setShowUpdateCardModal}
                setCards={setCards}
                columnId={column_id}
                setCounter={setCounter}
              />
            )}
          </div>
          <p>{card_task}</p>
          <div className='modal-button-cont'>
            <button className='btn' onClick={toggle}>
              Update
            </button>
            <button className='btn' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
