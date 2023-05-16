const express = require('express');

const boardController = require('../controllers/boardController');
const router = express.Router();

//read board data, send to frontend
router.get('/:id', boardController.getBoard, (req, res) => {
  return res.status(200).json(res.locals.board);
});

//create a new board and connect board to user
router.post(
  '/create',
  boardController.createBoard,
  boardController.joinUsernBoard,
  (req, res) => {
    return res.status(200).json(res.locals.board);
  }
);

//update board name
router.patch('/update', boardController.updateBoard, (req, res) => {
  return res.status(200).send('board name updated');
});

//delete board
router.delete('/delete', boardController.deleteBoard, (req, res) => {
  return res.status(200).send('board deleted');
});

module.exports = router;
