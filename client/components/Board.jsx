import React, { Component } from "react";
import Column from "./Column.jsx";

// placeholder data
const dummyCol = {
  _id: 1,
  name: 'don\'t look',
  board_id: 0, 
};
const dummyCol1 = {
  _id: 2,
  name: 'don\'t eat',
  board_id: 0, 
};
const dummyColArray = [dummyCol, dummyCol1];

// board should get all cols
  // cols should get all its cards
    // cards fill out with all their data

// delete board -> delete all columns (single query)
// delete column ->  delete all associated cards  (single query)

// get all columns expecting an array[] of column objects
// expecting board object with all the id and name properties

function Board () {
  // render array of column objects prop drilling column info
  const renderColumns = dummyColArray.map((columnObj) => (
    <Column key={columnObj._id} column={columnObj}/>
  ));

  return (
    <div className="column-container">
      {renderColumns}
      <div>
        <button className="addColumn">ADD COLUMN</button>
      </div>
    </div>
  )
}

//  onClick={() => setShowColumnModal(true)}
export default Board;