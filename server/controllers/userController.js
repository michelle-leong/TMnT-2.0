const bcrypt = require('bcryptjs');
const pool = require('../models/userModel');

const SALT_WORK_FACTOR = 10;

const userController = {};

// Create new user
userController.createUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    //no username or password
    if (!username || !password) {
      return next({
        log: 'userController.createUser: username and password must be provided',
        message: {
          err: 'userController.createUser: username and password must be provided',
        },
      });
    }

    //check if there is a user with corresponding username
    const checkUser = `SELECT username FROM users WHERE username = '${username}'`;
    const checkUserQuery = await pool.query(checkUser);
    if (checkUserQuery.rows.length) {
      return next({
        log: 'userController.createUser: username must be unique',
        message: {
          err: 'userController.createUser: username must be unique',
        },
      });
    }

    //create the new user in database and hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const queryString = `INSERT INTO users (username, password, first_name, last_name) 
    VALUES ('${username}', '${hashedPassword}', '${firstName}', '${lastName}') 
    RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.user = response.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'ERROR in userController.createUser ' + err,
      message: {
        err: 'userController.createUser ' + err,
      },
    });
  }
};

// Verify user
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // no username or password provided
    if (!username || !password) {
      return next({
        log: 'userController.createUser: username and password must be provided',
        message: {
          err: 'userController.createUser: username and password must be provided',
        },
      });
    }

    //check to see if there's a user with that username
    const queryString = `SELECT * FROM users WHERE username = '${username}'`;
    const response = await pool.query(queryString);
    const queryResponse = response.rows;
    if (queryResponse.length === 0) {
      return next({
        log: 'userController.createUser',
        message: {
          err: 'userController.createUser: username and password not found ',
        },
      });
    }

    // validate user's password
    bcrypt.compare(password, queryResponse[0].password, (err, response) => {
      if (err) {
        return next({
          log: 'userController.createUser',
          message: {
            err: 'userController.createUser: password not found ',
          },
        });
      } else {
        //only send back user and name to frontend
        res.locals.user = {
          _id: queryResponse[0]._id,
          first_name: queryResponse[0].first_name,
        };
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

//get all boards for logged in user
userController.getBoards = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const queryString = `SELECT boards._id, boards.name
    FROM users_boards
    INNER JOIN boards 
    ON users_boards.board_id = boards._id
    WHERE user_id = ${userId}`;
    const boards = await pool.query(queryString);
    res.locals.allBoards = boards.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in userController.getBoards ' + err,
      message: {
        err: 'userController.getBoards ' + err,
      },
    });
  }
};

module.exports = userController;
