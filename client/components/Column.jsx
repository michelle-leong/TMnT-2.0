import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { CardModal } from './Modals.jsx';
import { Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

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
const Column = ({ columns, column, setColumns, key }) => {
  const { column_id, column_name, cards } = column;

  const [showCardModal, setShowCardModal] = useState(false);
  const [cardArray, setCards] = useState([]); // ideally a doubly linked list for super fast insertion

  useEffect(() => {
    if (!Array.isArray(cards)) setCards([]);
    else setCards(cards);
  }, []);

  const handleDelete = () => {
    console.log('axios deleted Column', column_id);
    // console.log('key', key);
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
  // console.log('cards', cards);
  // open up add card modal form
  const toggle = () => {
    console.log('toggled Add Card Modal');
    setShowCardModal(!showCardModal);
  };

  /**
   * useEffect after the a column is created updated deleted
   *  async call to fetch all card data associated with column
   * to re render the columns
   */

  // render array of card objects prop drilling card info
  // console.log(`${column_id}'s cardArray : ${cardArray}`);
  const renderCards = cardArray.map((cardObj, index) => (
    <Card
      dropIndex={index}
      id={cardObj._id}
      card={cardObj}
      setCards={setCards}
      toggle={toggle}
    />
  ));
  // console.log(renderCards)
  /**
   * TODO column titles should be an input similar
   * to the board title, so they can be changed and updated
   */
  return (
    <Droppable droppableId={column_id.toString()}>
      {(provided) => (
        <div
          className='columnCont'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className='modal-box'>
            {showCardModal && (
              <CardModal
                showCardModal={showCardModal}
                setShowCardModal={setShowCardModal}
                setCards={setCards}
                columnId={column_id}
              />
            )}
          </div>
          <div>{column_name}</div>
          <div className='cardCont'>
            {renderCards}
            {provided.placeholder}
          </div>
          <div className='modal-button-cont'>
            <button className='btn' onClick={toggle}>
              Add Card
            </button>
            <button className='btn' onClick={handleDelete}>
              Delete Column
            </button>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
