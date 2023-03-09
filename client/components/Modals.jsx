import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
      name,
      board_id
    };
    
    console.log('axios create column');
    // axios will return a column with an _id
    // push that column with the _id onto our array
    // for now pushing the newColumn object
    // temporary add column
    axios.post('api/columns/new', {
      "board_id": "2",
      "name": "teset1234"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error caught when creating new column!!!");
        } 
        setColumns(prevColumns => {
          const addColumn = {
            column_id: response._id,
            column_name: response.name,
            board_id: response.board_id
          };

          return [...prevColumns, addColumn];
        });
      })
      .catch((err) => {
        console.error("Error caught when creating new column");
      })

    // setColumns(columnsState => {
    //   const newState = columnsState.map(obj => ({...obj}));
    //   newState.push({
    //     column_id: 999,
    //     column_name: newColumn.name,
    //     board_id
    //   });
    //   return newState;
    // });
    

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
    newCard.columnId: ${newCard.columnId}
    `);
    console.log('axios create card');
    // axios will return a card with an _id
      // push that card with the _id onto our array
      // for now pushing the newcard object
    // dummy addCard
    const addCard = {
      card_id: 999,
      card_task: newCard.task
    }
    
    setCards(cardsState => {
      const newState = cardsState.map(obj => ({...obj}));
      newState.push(addCard);
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