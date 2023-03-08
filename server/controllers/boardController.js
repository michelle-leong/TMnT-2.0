// const Board = require('../models/boardModel');
// const mongoose = require('mongoose');
const pool = require('../models/userModel');

const boardController = {};

// create a Board

boardController.test = (req, res, next) => {
  console.log('in boardController');
  return next();
};
boardController.createBoard = async (req, res, next) => {
  try {
    const boardName = req.body.name; //or req.params.board
    const queryString = `INSERT into boards (name) VALUES ('${boardName}') RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.board = response.rows;
    console.log(res.locals.board);
    return next();
  } catch (err) {
    return next({
      log: 'boardController.createBoard',
      message: { err: 'ERROR in boardController.createBoard' },
    });
  }
};

//make frontend send back id
// also need an update Board (update name)
boardController.updateBoard = async (req, res, next) => {
  try {
    const boardId = req.body.id;
    const boardName = req.body.name; // or req.params.board
    // console.log('boardId', boardId, 'boardName', boardName);
    // UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
    const queryString = `UPDATE boards SET name = '${boardName}' WHERE _id = ${boardId}`;
    await pool.query(queryString);
    console.log(`table id ${boardId} updated`);
    return next();
  } catch (err) {
    return next({
      log: 'boardController.updateBoard',
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
      log: 'boardController.deleteBoard',
      message: { err: 'ERROR in boardController.deleteBoard' },
    });
  }
};

// rewrite the codes for getBoards based on SQL

boardController.getBoards = (req, res, next) => {
  console.log('running boardController.getBoard. res.locals: ', res.locals);
  let { boardIds } = res.locals;

  Board.find({ _id: { $in: boardIds } })
    .then((response) => {
      res.locals.boards = response;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in boardController.getBoards',
        message: { err: 'boardController.getBoards' + err },
      });
    });
};

module.exports = boardController;
