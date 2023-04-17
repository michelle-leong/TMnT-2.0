import React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BoardContext from '../context/BoardContext.jsx';

// Modal for the columns
/**
 * showColumnModeal : Boolean
 * columns : array[] of column objects
 * board_id : Number
 */

export const ColumnModal = ({ setShowColumnModal, setColumns }) => {
  const { currBoardID } = useContext(BoardContext);

  const [name, setName] = useState('');
  const handleAdd = () => {
    const newColumn = {
      name: name,
      board_id: currBoardID,
    };

    axios
      .post('/api/columns/new', newColumn)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when creating new column!!!');
        }

        setColumns((columnsState) => {
          const newState = columnsState.map((obj) => ({ ...obj }));
          newState.push({
            column_id: response.data._id,
            column_name: response.data.name,
            board_id: response.data.board_id,
            cards: [],
          });
          console.log(newState);
          return newState;
        });
      })
      .catch((err) => {
        console.error('Error caught when creating new column ' + err);
      });
    setShowColumnModal(false);
  };

  const handleCancel = () => {
    setShowColumnModal(false);
  };

  return (
    <div className='modal-home'>
      <form className='modal-form'>
        <h1>ADD COLUMN</h1>
        <input
          className='modal-column-input'
          type='text'
          // required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='column name'
        />
      </form>
      <div className='modal-button-cont'>
        <button className='modal-text-button' onClick={handleAdd}>
          ADD
        </button>
        <button className='modal-text-button' onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

/**
 * showCardModeal : Boolean
 * cards : array[] of card objects
 * board_id : Number
 */
export const CardModal = ({
  showCardModal,
  setShowCardModal,
  setCards,
  columnId,
  setCounter,
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
      columnId,
    };

    axios
      .post('/api/cards/create', newCard)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when creating new cards!!!');
        }
        setCards((cardsState) => {
          const newState = cardsState.map((obj) => ({ ...obj }));
          newState.push({
            card_id: response.data._id,
            card_task: response.data.task,
          });
          return newState;
        });
      })
      .catch((err) => {
        console.error('Error caught when creating new card ' + err);
      });
    setCounter((prev) => ++prev);
    setShowCardModal(!showCardModal);
  };

  const handleCancel = () => {
    setShowCardModal(!showCardModal);
  };

  return (
    <div className='modal-home'>
      <form className='modal-form'>
        <h1>ADD CARD</h1>
        <input
          className='card-modal-input'
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          // required
          placeholder='add a task'
          // do we want an onChange here or wait until the input is finished
        />
      </form>
      <div className='modal-button-cont'>
        <button className='modal-text-button' onClick={handleAdd}>
          ADD CARD
        </button>
        <button className='modal-text-button' onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export const UpdateCardModal = ({
  showUpdateCardModal,
  setShowUpdateCardModal,
  setCards,
  card_id,
}) => {
  const [task, setTask] = useState('');

  /**
   * TODO error checking for empty strings
   * they were using required but it doesn't
   * function without a submit in the form
   */
  const handleUpdate = () => {
    const updateCard = {
      task,
      card_id,
    };

    console.log(`
  newCard.task: ${updateCard.task}\n
  newCard.card_id: ${updateCard.card_id}
  `);

    axios
      .patch('api/cards/update', updateCard)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when updating new cards!!!');
        }

        setCards((cardsState) => {
          let newState = [...cardsState];
          const index = cardsState.findIndex(
            (cardObj) => cardObj.card_id === card_id
          );
          console.log('index', index, 'res data', response.data);
          const updatedCard = [
            {
              card_id: response.data._id,
              card_task: response.data.task,
              column_id: response.data.column_id,
            },
          ];
          newState = newState
            .slice(0, index)
            .concat(updatedCard)
            .concat(newState.slice(index + 1, newState.length));
          return newState;
        });
      })
      .catch((err) => {
        console.error('Error caught when updating new card ' + err);
      });
    setShowUpdateCardModal(!showUpdateCardModal);
  };

  const handleCancel = () => {
    setShowUpdateCardModal(!showUpdateCardModal);
  };

  return (
    <div className='modal-home'>
      <form className='modal-form'>
        <h1>UPDATE CARD</h1>
        <input
          className='card-modal-input'
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          // required
          placeholder='add a task'
          // do we want an onChange here or wait until the input is finished
        />
      </form>
      <div className='modal-button-cont'>
        <button className='modal-text-button' onClick={handleUpdate}>
          UPDATE
        </button>
        <button className='modal-text-button' onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
