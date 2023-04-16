import React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';

// components
import Column from './Column.jsx';
import { ColumnModal } from './Modals.jsx';
import BoardContext from '../context/BoardContext.jsx';

/**
 * [
 *     {
 *         "board": {
 *             "columns": [
 *                 {
 *                     "cards": [
 *                         {
 *                             "card_id": 4,
 *                             "card_task": "its a task"
 *                         }
 *                     ],
 *                     "column_id": 2,
 *                     "column_name": "testing columns"
 *                 },
 *                 {
 *                     "cards": [
 *                         {
 *                             "card_id": 1,
 *                             "card_task": "task updated again and again"
 *                         },
 *                         {
 *                             "card_id": 5,
 *                             "card_task": "its a task"
 *                         },
 *                         {
 *                             "card_id": 6,
 *                             "card_task": "its a task"
 *                         }
 *                     ],
 *                     "column_id": 3,
 *                     "column_name": "another testing column"
 *                 }
 *             ],
 *             "board_id": 2,
 *             "board_name": "test board"
 *         }
 *     }
 * ]
 *
 */
/**
 *
 * @param {props = {board : array[0].board = board object}} param0
 * @returns
 */
const Board = () => {
  const { currBoardID } = useContext(BoardContext);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState([]);

  const [update, setUpdate] = useState(true);

  console.log(currBoardID);
  useEffect(() => {
    axios.get(`/api/boards/${currBoardID}`).then((response) => {
      const currentBoard = response.data;
      if (currentBoard.length === 0) {
        setColumns([]);
      } else {
        setColumns(currentBoard.columns);
      }
    });

    // empty array dependency, so this runs only on mount
  }, []);

  // const handleDelete = () => {
  //   console.log('axios deleted Board');
  // }

  // open up add Column modal form
  const toggle = () => {
    console.log('toggled Add Column Modal');
    setShowColumnModal(!showColumnModal);
  };
  // render array of column objects prop drilling column info
  const renderColumns = columns.map((columnObj) => (
    <Column
      key={columnObj.column_id}
      column={columnObj}
      setColumns={setColumns}
      columns={columns}
    />
  ));

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let beginning;
    let landing;
    let beginningIndex;
    let landingIndex;

    columns.forEach((ele, index) => {
      if (ele.column_id.toString() === source.droppableId) {
        beginning = ele;
        beginningIndex = index;
      }
      if (ele.column_id.toString() === destination.droppableId) {
        landingIndex = index;
        landing = ele;
      }
    });
    const cardCopy = { ...beginning.cards[source.index] };
    //create a copy of the card
    setColumns((prevState) => {
      //copy previous state
      prevState = [...prevState];

      //remove card from old column
      prevState[beginningIndex].cards.splice(source.index, 1);

      //add card to new column
      prevState[landingIndex].cards.splice(destination.index, 0, cardCopy);
      return prevState;
    });

    let columnId = landing.column_id;
    axios
      .patch(`/api/cards/moveCard`, {
        id: cardCopy.card_id,
        columnId: columnId,
      })
      .then((response) => {
        if (response !== 200) {
          throw new Error('Error caught when updating card!!!');
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.error('Error caught when updating card');
      });
  };

  // TODO board DELETE button
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='column-container'>
        <div className='modal-box'>
          {showColumnModal && (
            <ColumnModal
              showColumnModal={showColumnModal}
              setShowColumnModal={setShowColumnModal}
              setColumns={setColumns}
              setUpdate={setUpdate}
              currBoardID={currBoardID}
            />
          )}
        </div>
        {renderColumns}
        <div>
          <button className='addColumn' onClick={toggle}>
            ADD COLUMN
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;

// board should get all cols
// cols should get all its cards
// cards fill out with all their data

// delete board -> delete all columns (single query)
// delete column ->  delete all associated cards  (single query)
