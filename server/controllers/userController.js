const User = require('../models/userModel');
const path = require('path');
const pool = require('../models/userModel');

const userController = {};

// Create new user
// when new user is created, send them to createBoard
userController.createUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password) {
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username and password must be provided',
        },
      });
    }

    const checkUser = `SELECT username FROM users WHERE username = '${username}'`;
    const checkUserQuery = await pool.query(checkUser);
    if (checkUserQuery.rows.length) {
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username must be unique',
        },
      });
    }

    const queryString = `INSERT INTO users (username, password, first_name, last_name) 
    VALUES ('${username}', '${password}', '${firstName}', '${lastName}') 
    RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.newUser = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'userController.createUser',
      message: {
        err: 'userController.createUser' + err,
      },
    });
  }
};

// Verify user
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // ERROR HANDLING
    if (!username || !password) {
      console.log(
        'Error in userController.verifyUser: username and password must be provided'
      );
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username and password must be provided',
        },
      });
    }
    const queryString = `SELECT * FROM users WHERE username = '${username}'`;
    const response = await pool.query(queryString);
    const queryResponse = response.rows;
    console.log(queryResponse);
    if (queryResponse.length === 0 || password !== queryResponse[0].password) {
      console.log('no password match');
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username and password not found ',
        },
      });
    }
    // valid user
    else {
      res.locals.user = queryResponse[0];
      return next();
    }
  } catch (err) {
    return next({
      log: 'userController.verifyUser',
      message: { err: 'userController.verifyUser' + err },
    });
  }
};

userController.getBoards = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const queryString = `SELECT boards._id, boards.name
    FROM users_boards
    INNER JOIN boards 
    ON users_boards.board_id = boards._id
    WHERE user_id = ${userId}`;
    const boards = await pool.query(queryString);
    res.locals.allboards = boards;
    return next();
  } catch (error) {
    return next({
      log: 'error in userController.getBoards',
      message: {
        err: 'userController.getBoards' + err,
      },
    });
  }
};

module.exports = userController;
