const express = require('express');

const cardController = require('../controllers/cardController');
const router = express.Router();

//create a card
router.post('/create', cardController.createCard, (req, res) => {
  return res.status(200).json(res.locals.cardCreated);
});

//update a card's task
router.patch('/update', cardController.updateCard, (req, res) => {
  return res.status(200).json('updated card task');
});

//update card's column
router.patch('/moveCard', cardController.moveCard, (req, res) => {
  return res.status(200).json('updated card column');
});

//delete a card
router.delete('/delete', cardController.deleteCard, (req, res) => {
  return res.status(200).send('card deleted');
});

module.exports = router;
