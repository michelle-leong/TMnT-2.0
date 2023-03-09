import React, { Component } from "react";
import { useState, useEffect } from "react";
import Column from './Column.jsx'

// Modal for the columns
/**
 * showColumnModeal : Boolean
 * columns : array[] of column objects
 * board_id : Number
 */
export const ColumnModal = ({ 
    showColumnModal, 
    setShowColumnModal, 
    setColumns,
    board_id
  }) => {

  const [name, setName] = useState('');
  
  const handleAdd = () => {
    const newColumn = {
      _id: 10, // temp assignment
      name,
      board_id
    };

    console.log(`
    newColumn._id : ${newColumn._id}\n
    newColumn.name: ${newColumn.name}\n
    newColumn.board_id : ${newColumn.board_id}
    `);
    console.log('axios create column');
    // axios will return a column with an _id
      // push that column with the _id onto our array
      // for now pushing the newColumn object
    // temporary add column
    const addColumn = {
      column_id: newColumn._id,
      column_name: newColumn.name
    };
    setColumns(columnsState => {
      const newState = columnsState.map(obj => ({...obj}));
      newState.push(addColumn);
      return newState;
    });

    setShowColumnModal(!showColumnModal);
    // setShowCardModal(!showCardModal);
  }

  const handleCancel = () => {
    setShowColumnModal(!showColumnModal);
  };

  return (
    <div className="modal-home">

      <form className='modal-form'>
        <h1>ADD COLUMN</h1>
        <input 
          className="modal-column-input"
          type="text"
          // required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="column name"
        />
      </form>
      <div className='modal-button-cont'>
        <button 
          className="modal-text-button"
          onClick={handleAdd}
        >
          ADD
        </button>
        <button 
          className="modal-text-button"
          onClick={handleCancel}
        >
          DELETE
        </button>
      </div>
      {/* {showCardModal && <CardModal />} */}
    </div>
  )
}



/**
 * showCardModeal : Boolean
 * cards : array[] of card objects
 * board_id : Number
 */
export const CardModal = ({ 
    showCardModal, 
    setShowCardModal, 
    setCards,
    columnId 
  }) => {

  const [task, setTask] = useState(''); 

  /**
   * TODO error checking for empty strings 
   * they were using required but it doesn't
   * function without a submit in the form
   */
  const handleAdd = () => {
    const newCard = {
      task,
      columnId
    };

    console.log(`
    newCard.task: ${newCard.task}\n
    newCard.task: ${newCard.columnId}
    `);
    console.log('axios create card');
    // axios will return a card with an _id
      // push that card with the _id onto our array
      // for now pushing the newcard object
    setCards(cardsState => {
      const newState = cardsState.map(obj => ({...obj}));
      newState.push(newCard);
      return newState;
    });

    setShowCardModal(!showCardModal);
  }

  const handleCancel = () => {
    setShowCardModal(!showCardModal);
  }

  return (
    <div className="modal-home">
        <form className='modal-form'>
          <h1>ADD CARD</h1>
          <input 
            className="card-modal-input"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            // required
            placeholder="add a task"
            // do we want an onChange here or wait until the input is finished
          />
        </form>
        <div className='modal-button-cont'>
          <button 
            className="modal-text-button"
            onClick={handleAdd}
          >
            ADD CARD
          </button>
          <button 
            className="modal-text-button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </div>
    </div>
  )
}