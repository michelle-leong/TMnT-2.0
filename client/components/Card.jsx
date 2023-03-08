import React, { Component } from "react";

function Card ({ card }) {
  console.log(`card is: ${card}`);
  const { name, task } = card;

  return (
    <div className="card card-content-container">
      <h4>{name}</h4>
      <p>{task}</p>
      <div className="modal-button-cont">
        <button className="btn">Update</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default Card;