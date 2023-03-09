const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // what should happen here on successful log in?
    return res.status(200).json(res.locals.user);
    // res.redirect("/");
  }
);

router.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // what should happen here on successful log in?
    // res.redirect('/secret');
    return res.status(200).json(res.locals.user);
    //change redirect to frontend w react router
  }
);

// res with all boards for the user
router.post(
  '/getBoards',
  sessionController.isLoggedIn,
  userController.getBoards,
  (req, res) => {
    return res.status(200).send(res.locals.allBoards);
  }
);

router.post('/logout', sessionController.deleteSession, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
