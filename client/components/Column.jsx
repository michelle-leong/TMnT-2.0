import React, { Component } from "react";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
// import { CardModal } from "./Modals";

// placeholder data
const dummyCard = {
  _id: 1,
  name: 'don\'t card',
  task: 'some task',
  column_id: 0, 
};
const dummyCard1 = {
  _id: 2,
  name: 'don\'t banana',
  task: 'some task 2',
  column_id: 0, 
};
const dummyCardArray = [dummyCard, dummyCard1];

// get all cards expecting an array[] of card objects

// _id might cause a failure
function Column ({ column }) {

  const { _id, name } = column;

  const handleDelete = () => {
    console.log('axios deleted Column');
  }
  
  const handleAdd = () => {
    console.log('axios add card');
  }

  // open up add card modal form
  const toggle = () => {
    console.log('toggled Add Card Modal');
  }

  // render array of card objects prop drilling card info
  const renderCards = dummyCardArray.map((cardObj) => (
    <Card key={cardObj._id} card={cardObj}/>
  ));

  return (
    <div className='columnCont'>
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
// onClick={() => setShowCardModal(true)}
export default Column;