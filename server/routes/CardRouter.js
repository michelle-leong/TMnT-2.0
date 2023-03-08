const express = require('express');

const cardController = require('../controllers/cardController');
const router = express.Router();

// confirm the body

// res with cards per column id
// router.post('/', cardController.getCard, (req, res) => {
//   return res.status(200).send(res.locals.cards);
// });

// res with card created
router.post('/create', cardController.createCard, (req, res) => {
  return res.status(200).json(res.locals.cardCreated);
});

// // res with card updated
router.patch('/update', cardController.updateCard, (req, res) => {
  return res.status(200).json(res.locals.cardUpdated);
});

router.patch('/moveCard', cardController.moveCard, (req, res) => {
  return res.status(200).json(res.locals.movedCard);
});

// // // res with message 'card deleted'
router.delete('/delete', cardController.deleteCard, (req, res) => {
  return res.status(200).send('card deleted');
});

module.exports = router;
