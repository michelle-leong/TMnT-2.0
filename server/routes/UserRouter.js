const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
  // what should happen here on successful log in?
  return res.status(200).json(res.locals.user);
  // res.redirect("/");
});

router.post(
  '/signup',
  userController.createUser,

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
  // sessionController.isLoggedIn,
  userController.getBoards,
  (req, res) => {
    return res.status(200).send(res.locals.allBoards);
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    else {
      // req.end();
      return res.status(200).send('destroyed session');
    }
  });
});

module.exports = router;
