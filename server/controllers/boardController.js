// const Board = require('../models/boardModel');
// const mongoose = require('mongoose');
const pool = require('../models/userModel');

const boardController = {};

// create a Board

boardController.createBoard = async (req, res, next) => {
  try {
    const boardName = req.body.name; //or req.params.board
    const queryString = `INSERT INTO boards (name) VALUES ('${boardName}') RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.board = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.createBoard',
      message: { err: 'ERROR in boardController.createBoard' + err },
    });
  }
};

//make frontend send back id
// also need an update Board (update name)
boardController.updateBoard = async (req, res, next) => {
  try {
    const boardId = req.body.id;
    const boardName = req.body.name; // or req.params.board
    console.log('boardId', boardId, 'boardName', boardName);
    // UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
    const queryString = `UPDATE boards SET name = '${boardName}' WHERE _id = ${boardId}`;
    await pool.query(queryString);
    console.log(`table id ${boardId} updated`);
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.updateBoard',
      message: { err: 'ERROR in boardController.updateBoard' },
    });
  }
};

//make frontend send back id
// also a delete Boards
boardController.deleteBoard = async (req, res, next) => {
  try {
    const boardId = req.body.id; //or req.params.board
    await pool.query(`DELETE FROM boards WHERE _id = ${boardId}`);
    console.log(`table id ${boardId} deleted`);
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.deleteBoard',
      message: { err: 'ERROR in boardController.deleteBoard' + err },
    });
  }
};

boardController.joinUsernBoard = async (req, res, next) => {
  // console.log('running boardController.getBoard. res.locals: ', res.locals);

  try {
    const userId = req.body.id;
    const boardId = res.locals.board[0]._id;
    const queryString = `INSERT INTO users_boards (user_id, board_id)
    VALUES (${userId}, ${boardId})`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.getBoards',
      message: { err: 'boardController.getBoards' + err },
    });
  }
};

//update to make it get all information for that specific board
boardController.getBoards = async (req, res, next) => {
  console.log('running boardController.getBoard. res.locals: ', res.locals);

  try {
    const queryString = `SELECT * FROM boards`;
    const response = await pool.query(queryString);
    res.locals.allBoards = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.getBoards',
      message: { err: 'boardController.getBoards' + err },
    });
  }
};

module.exports = boardController;
