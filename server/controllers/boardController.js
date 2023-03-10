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
    res.locals.board = response.rows[0];
    console.log('in boardController.createBoard', res.locals.board);
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
    const queryString = `UPDATE boards SET name = '${boardName}' WHERE _id = ${boardId} RETURNING *`;
    const updatedBoard = await pool.query(queryString);
    console.log(`table id ${boardId} updated`);
    res.locals.updatedBoard = updatedBoard.rows[0];
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
  try {
    const userId = req.body.id;
    const boardId = res.locals.board._id;
    const queryString = `INSERT INTO users_boards (user_id, board_id)
    VALUES (${userId}, ${boardId})`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.joinUsernBoard',
      message: { err: 'boardController.joinUsernBoard' + err },
    });
  }
};

//_id in object is the board _id;
boardController.getBoard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const queryString = `SELECT jsonb_build_object(
      'board_id', b._id,
      'board_name', b.name,
      'columns', jsonb_agg(
          jsonb_build_object(
              'column_id', c._id,
              'column_name', c.name,
              'cards', COALESCE((
                  SELECT jsonb_agg(
                      jsonb_build_object(
                          'card_id', cd._id,
                          'card_task', cd.task
                      )
                  )
                  FROM cards cd
                  WHERE cd.column_id = c._id
              ), '[]'::jsonb)
          )
      )
  ) AS board
  FROM boards b
  INNER JOIN columns c ON c.board_id = b._id
  WHERE b._id = ${id}
  GROUP BY b._id;`;
    const response = await pool.query(queryString);
    res.locals.board = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in boardController.getBoards',
      message: { err: `boardController.getBoards ${err}` },
    });
  }
};

module.exports = boardController;
