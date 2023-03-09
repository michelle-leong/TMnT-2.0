import React, { Component } from "react";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { CardModal } from "./Modals.jsx";

// _id might cause a failure
export default function Column ({ column, setColumns }) {

  const { _id, name } = column;

  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState([]); // ideally a doubly linked list for super fast insertion

  const handleDelete = () => {
    console.log('axios deleted Column');
    setColumns(columnsState => {
      const newState = columnsState.map(obj => ({...obj}));
      const index = newState.indexOf(_id);
      newState.splice(index, 1);
      return newState;
    });
  }

  // open up add card modal form
  const toggle = () => {
    console.log('toggled Add Card Modal');
    setShowCardModal(!showCardModal);
  }

   /**
   * useEffect after the a column is created updated deleted
   *  async call to fetch all card data associated with column
   * to re render the columns
   */

  // render array of card objects prop drilling card info
  const renderCards = cards.map((cardObj) => (
    <Card 
      key={cardObj._id} 
      card={cardObj}
      setCards={setCards}
    />
  ));

  /**
   * TODO column titles should be an input similar 
   * to the board title, so they can be changed and updated
   */
  return (
    <div className='columnCont'>
      <div className="modal-box">
        {showCardModal && 
          <CardModal
            showCardModal={showCardModal}
            setShowCardModal={setShowCardModal}
            setCards={setCards}
            column_id={_id}
          />
        }
      </div>
      <div>{name}</div>
      <div className='cardCont'>
        {renderCards}
      </div>
      <div className="modal-button-cont">
        <button className="btn" onClick={toggle}>Add Card</button>
        <button className="btn" onClick={handleDelete}>Delete Column</button>
      </div>
    </div>
  );
}