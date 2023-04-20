import React, { useState } from 'react';
import axios from 'axios';

// Modal for the columns
/**
 * showColumnModeal : Boolean
 * columns : array[] of column objects
 * board_id : Number
 */

export const ColumnModal = ({ setShowColumnModal, setColumns, boardId }) => {
  const [name, setName] = useState('');
  const handleAdd = () => {
    //object to send to database
    const newColumn = {
      name: name,
      board_id: boardId,
    };
    if (name === '') {
      setShowColumnModal(false);
      return;
    }

    //post request to make new column
    axios
      .post('/api/columns/new', newColumn)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when creating new column!!!');
        }
        //update columns state with the new column
        setColumns((columnsState) => {
          const newState = columnsState.map((obj) => ({ ...obj }));
          newState.push({
            column_id: response.data._id,
            column_name: response.data.name,
            cards: [],
          });
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
          className='modal-input'
          type='text'
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
  columnId,
  setColumns,
}) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    const newCard = {
      task,
      columnId,
    };

    if (task === '') {
      setShowCardModal(false);
      return;
    }

    axios
      .post('/api/cards/create', newCard)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when creating new cards!!!');
        }
        setColumns((prevState) => {
          const stateCopy = prevState.slice();
          const columnIndex = stateCopy.findIndex(
            (column) => column.column_id === columnId
          );
          const column = stateCopy[columnIndex];
          column.cards.push({
            card_id: response.data._id,
            card_task: response.data.task,
          });
          return stateCopy;
        });
      })
      .catch((err) => {
        console.error('Error caught when creating new card ' + err);
      });

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
          className='modal-input'
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
  card_id,
  setShowUpdateCardModal,
  columnId,
  setColumns,
  cardTask,
}) => {
  const [task, setTask] = useState(cardTask);

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
    if (task === '') {
      setShowUpdateCardModal(false);
      return;
    }
    axios
      .patch('api/cards/update', updateCard)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error caught when updating new cards!!!');
        }

        setColumns((prevState) => {
          const stateCopy = prevState.slice();
          const columnIndex = stateCopy.findIndex(
            (column) => column.column_id === columnId
          );
          const column = stateCopy[columnIndex];
          const cardIndex = column.cards.findIndex(
            (card) => card.card_id === card_id
          );
          const updatedCard = {
            card_id: response.data._id,
            card_task: response.data.task,
          };
          column.cards.splice(cardIndex, 1);
          column.cards.splice(cardIndex, 0, updatedCard);
          return stateCopy;
        });
      })
      .catch((err) => {
        console.error('Error caught when updating new card ' + err);
      });
    setShowUpdateCardModal(false);
  };

  const handleCancel = () => {
    setShowUpdateCardModal(false);
  };

  return (
    <div className='modal-home'>
      <form className='modal-form'>
        <h1>UPDATE CARD</h1>
        <input
          className='modal-input'
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='update a task'
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
