import React, { Component } from "react";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { CardModal } from "./Modals.jsx";

/**
 * {
 *     "cards": [
 *         {
 *             "card_id": 1,
 *             "card_task": "task updated again and again"
 *         },
 *         {
 *             "card_id": 5,
 *             "card_task": "its a task"
 *         },
 *         {
 *             "card_id": 6,
 *             "card_task": "its a task"
 *         }
 *     ],
 *     "column_id": 3,
 *     "column_name": "another testing column"
 * }
 */
/**
 * 
 * @param {
 * column : {
 * cards: [{card objects}]
 * column_id: number
 * column_name: string
 * }
 * 
 * setColumns = fn
 * } param0 
 * @returns 
 */
export default function Column ({ column, setColumns }) {

  const { column_id,  column_name , cards} = column;

  const [showCardModal, setShowCardModal] = useState(false);
  const [cardArray, setCards] = useState(cards); // ideally a doubly linked list for super fast insertion

  const handleDelete = () => {
    console.log('axios deleted Column');
    setColumns(columnsState => {
      const newState = columnsState.map(obj => ({...obj}));
      const index = newState.indexOf(column_id);
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
  const renderCards = cardArray.map((cardObj) => (
    <Card 
      key={cardObj.card_id} 
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
            columnId={column_id}
          />
        }
      </div>
      <div>{column_name} {column_id}</div>
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