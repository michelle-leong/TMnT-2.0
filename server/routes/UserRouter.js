const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

router.post(
  '/login',
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful log in?
    console.log("completing post request to '/login");
    // res.redirect('/secret');
    return res.status(200).json(res.locals.user);
    // res.redirect("/");
  }
);

router.post(
  '/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  (req, res) => {
    // what should happen here on successful log in?
    console.log("completing post request to '/signup");
    // res.redirect('/secret');
    return res.status(200).json(res.locals.newUser);
    //change redirect to frontend w react router
  }
);

// res with all boards for the user
router.post('/getBoards', userController.getBoards, (req, res) => {
  return res.status(200).send(res.locals.allBoards);
});

module.exports = router;
