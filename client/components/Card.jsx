import React, { Component } from "react";

export default function Card ({ card, setCards }) {

  const { card_id, card_task, column_id} = card;

  const handleDelete = () => {
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

  return (
    <div className="card card-content-container">
      <p>{card_task} {card_id}</p>
      <div className="modal-button-cont">
        <button className="btn" onClick={toggle}>Update</button>
        <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}