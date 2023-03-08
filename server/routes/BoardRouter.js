const express = require('express');

const boardController = require('../controllers/boardController');
const router = express.Router();

router.get('/', boardController.getBoards, (req, res) => {
  return res.status(200).json(res.locals.allBoards);
});

router.post(
  '/create',
  boardController.createBoard,
  boardController.joinUsernBoard,
  (req, res) => {
    return res.status(200).send('Board created');
  }
);

router.patch('/update', boardController.updateBoard, (req, res) => {
  return res.status(200).send('successful update');
});

router.delete('/delete', boardController.deleteBoard, (req, res) => {
  return res.status(200).send('board deleted');
});

module.exports = router;
