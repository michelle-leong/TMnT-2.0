const bcrypt = require('bcryptjs');
const pool = require('../models/userModel');

const SALT_WORK_FACTOR = 10;

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

    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const queryString = `INSERT INTO users (username, password, first_name, last_name) 
    VALUES ('${username}', '${hashedPassword}', '${firstName}', '${lastName}') 
    RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.user = response.rows[0];
    req.session.username = res.locals.user.username;
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
    if (queryResponse.length === 0) {
      console.log('no user match');
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username and password not found ',
        },
      });
    }
    // valid user
    bcrypt.compare(password, queryResponse[0].password, (err, response) => {
      if (err) {
        return next({
          log: 'userController.createUser',
          message: {
            err: 'userController.createUser: password not found ',
          },
        });
      } else {
        res.locals.user = queryResponse[0];
        req.session.username = res.locals.user.username;
        return next();
      }
    });
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
