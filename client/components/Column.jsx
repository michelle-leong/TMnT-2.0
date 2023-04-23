import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { CardModal } from './Modals.jsx';
import { Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

/**
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
const Column = ({ column, setColumns }) => {
  const { column_id, column_name, cards } = column;

  const [showCardModal, setShowCardModal] = useState(false);
  const [cardArray, setCards] = useState([]);

  //if column is empty, set an empty card array (query to database doesn't return empty array);
  useEffect(() => {
    if (!Array.isArray(cards)) setCards([]);
    else setCards(cards);
  }, []);

  //deleting column
  const handleDelete = () => {
    axios
      .delete(`/api/columns/delete`, {
        data: { id: column_id },
      })
      .then((response) => {
        if (response.status === 200) {
          setColumns((columnsState) => {
            const newState = columnsState.map((obj) => ({ ...obj }));
            const index = newState.findIndex(
              (colObj) => colObj.column_id === column_id
            ); // find column at index
            newState.splice(index, 1); // remove at index
            return newState;
          });
        }
      });
  };

  const renderCards = cardArray.map((cardObj, index) => (
    <Card
      dropIndex={index}
      id={cardObj._id}
      card={cardObj}
      setCards={setCards}
      setColumns={setColumns}
      columnId={column_id}
    />
  ));

  return (
    <Droppable key={column_id.toString()} droppableId={column_id.toString()}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className='columnCont'>
            <h1>{column_name}</h1>
            <div className='cardCont'>
              {renderCards}
              {provided.placeholder}
            </div>
            <div className='modal-button-cont'>
              <button className='btn' onClick={() => setShowCardModal(true)}>
                Add Card
              </button>
              <button className='btn' onClick={handleDelete}>
                Delete Column
              </button>
            </div>
          </div>
          <div className='modal-box'>
            {showCardModal && (
              <CardModal
                showCardModal={showCardModal}
                setShowCardModal={setShowCardModal}
                setCards={setCards}
                columnId={column_id}
                setColumns={setColumns}
              />
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
