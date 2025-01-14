const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

//log in to account
router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//make a new user account
router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// res with all boards for the user
router.post('/getBoards', userController.getBoards, (req, res) => {
  return res.status(200).send(res.locals.allBoards);
});

module.exports = router;
