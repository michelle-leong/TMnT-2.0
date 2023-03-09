import React, { Component } from "react";
import { useState, useEffect } from "react";
import Column from "./Column.jsx";
import { ColumnModal } from "./Modals.jsx";
import {DragDropContext} from 'react-beautiful-dnd';

// get all columns expecting an array[] of column objects
// expecting board object with all the id and name properties
function Board ({ board }) {

  // const { _id, name } = board
  // placeholder data
  const _id = 1;
  const name = 'myBoard';

  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState([]);

  const handleDelete = () => {
    console.log('axios deleted Board');
  }

  // open up add Column modal form
  const toggle = () => {
    console.log('toggled Add Column Modal');
    setShowColumnModal(!showColumnModal);
  }
  console.log(`board ${_id} columns: ${columns}`);
  // render array of column objects prop drilling column info
  const renderColumns = columns.map((columnObj) => (
    <Column 
      key={columnObj._id}
      column={columnObj}
      setColumns={setColumns}
    />
  ));
  
  // TODO board DELETE button
  return (
    <DragDropContext>
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

//  onClick={() => setShowColumnModal(true)}
export default Board;

// board should get all cols
  // cols should get all its cards
    // cards fill out with all their data

// delete board -> delete all columns (single query)
// delete column ->  delete all associated cards  (single query)