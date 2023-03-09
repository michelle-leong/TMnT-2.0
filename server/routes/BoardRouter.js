const express = require('express');

const sessionController = require('../controllers/sessionController');
const boardController = require('../controllers/boardController');
const router = express.Router();

router.get('/:id', boardController.getBoard, (req, res) => {
  return res.status(200).json(res.locals.board);
});

router.post(
  '/create',
  boardController.createBoard,
  boardController.joinUsernBoard,
  (req, res) => {
    return res.status(200).json(res.locals.board);
  }
);

router.patch('/update', boardController.updateBoard, (req, res) => {
  return res.status(200).json(res.locals.updatedBoard);
});

router.delete('/delete', boardController.deleteBoard, (req, res) => {
  return res.status(200).send('board deleted');
});

module.exports = router;
