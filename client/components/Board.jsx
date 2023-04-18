import React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
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
  const { setCurrBoardID } = useContext(BoardContext);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [counter, setCounter] = useState(1);

  let { id } = useParams();

  //adding a new card and moving cards between columns doesn't work because the card array in the board is old, can't identify the cards unless we refetch the data
  useEffect(() => {
    axios.get(`/api/boards/${id}`).then((response) => {
      const currentBoard = response.data[0];
      console.log(currentBoard.board.columns);
      if (currentBoard.length === 0) {
        setColumns([]);
      } else {
        setColumns(currentBoard.board.columns);
      }
    });
    setCurrBoardID(id);
  }, [counter]);

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
      setCounter={setCounter}
    />
  ));

  // console.log(columns);

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
      const copyState = [...prevState];

      //remove card from old column
      copyState[beginningIndex].cards.splice(source.index, 1);

      //add card to new column
      copyState[landingIndex].cards.splice(destination.index, 0, cardCopy);
      return copyState;
    });

    let columnId = landing.column_id;
    console.log(columnId);
    axios
      .patch(`/api/cards/moveCard`, {
        id: cardCopy.card_id,
        columnId: columnId,
      })
      .then(() => {
        setCounter((prev) => ++prev);
      });
  };

  // TODO board DELETE button
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='column-container'>
        <div>
          <input type='text' />
          <button>Save</button>
          <button>Delete</button>
        </div>
        <div className='modal-box'>
          {showColumnModal && (
            <ColumnModal
              setShowColumnModal={setShowColumnModal}
              setColumns={setColumns}
              setCounter={setCounter}
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
