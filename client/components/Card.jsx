import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card ({ card, setCards, dropIndex }) {

  const { card_id, card_task, column_id} = card;

  const handleDelete = () => {
    console.log(_id);
    console.log('axios deleted card');
    setCards(cardsState => {
      const newState = cardsState.map(obj => ({...obj}));
      const index = newState.indexOf(card_id);
      newState.splice(index, 1);
      return newState;
    });
  }

  // open up update card modal form
  const toggle = () => {
    console.log('toggled update Card Modal');
  }
  /**
   * useEffect after the a card is created updated deleted
   * to re render the cards
   */

   /*className={`cards ${snapshot.isDragging ? "drag" : ""}`*/
// maybe in the Draggable code need to add task={task}??
  return (
    <Draggable key={card_id} draggableId={card_id.toString()} index={dropIndex}>
      {(provided, snapshot) => (
        <div className="card card-content-container"    
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>  
  
            <p>{card_task} {card_id}</p>
            <div className="modal-button-cont">
              <button className="btn" onClick={toggle}>Update</button>
              <button className="btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
      
    )}
    </Draggable>
  );
}