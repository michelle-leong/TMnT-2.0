import React, { Component } from "react";

function Card ({ card }) {

  const { _id, name, task, column_id} = card;

  const handleDelete = () => {
    console.log('axios deleted card');
  }

  const handleUpdate = () => {
    console.log('axios updated card');
  }

  // open up update card modal form
  const toggle = () => {
    console.log('toggled update Card Modal');
  }

  return (
    <div className="card card-content-container">
      <h4>{name}</h4>
      <p>{task}</p>
      <div className="modal-button-cont">
        <button className="btn" onClick={toggle}>Update</button>
        <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Card;