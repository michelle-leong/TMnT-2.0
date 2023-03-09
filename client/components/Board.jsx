import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import {DragDropContext} from 'react-beautiful-dnd';

// components
import Column from "./Column.jsx";
import { ColumnModal } from "./Modals.jsx";

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
function Board ({ currBoardID }) {
// const { _id, name } = board
  // placeholder data
  const name = 'myBoard';
  
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    axios.get(`api/boards/${currBoardID}`)
    .then(response => {
      if (response.status === 200) {
        const currentBoard = response.data[0].board;
        console.log(currentBoard);
        // update columns array with get data
        setColumns(columnsState => {
          const newState = currentBoard.columns;
          return newState;
        });
      }
    })
    // empty array dependency, so this runs only on mount
  }, []);


  // const handleDelete = () => {
  //   console.log('axios deleted Board');
  // }

  // open up add Column modal form
  const toggle = () => {
    console.log('toggled Add Column Modal');
    setShowColumnModal(!showColumnModal);
  }
  console.log(`board ${_id} columns: ${columns}`);
  // render array of column objects prop drilling column info
  const renderColumns = columns.map((columnObj) => (
    <Column 
      key={columnObj.column_id}
      column={columnObj}
      setColumns={setColumns}
    />
  ));

const onDragEnd = (result) => {
  console.log(result)

  const {source, destination} = result;

  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  let add;
  //set to column card array
  let beginning = source.droppableId;
  let landing = destination.droppableId;
  
}

  
  // TODO board DELETE button
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="column-container">
      <div className="modal-box">
        {showColumnModal && 
          <ColumnModal
            showColumnModal={showColumnModal}
            setShowColumnModal={setShowColumnModal}
            setColumns={setColumns}
            board_id={_id}
          />
        }
      </div>
      {renderColumns}
      <div>
        <button className="addColumn" onClick={toggle}>ADD COLUMN</button>
      </div>
    </div>
    </DragDropContext>
  )
}

export default Board;

// board should get all cols
  // cols should get all its cards
    // cards fill out with all their data

// delete board -> delete all columns (single query)
// delete column ->  delete all associated cards  (single query)