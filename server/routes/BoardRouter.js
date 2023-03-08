const express = require('express');

const boardController = require('../controllers/boardController');
const router = express.Router();

// router.get('/', boardController.test, (req, res) => {
//   return res.status(200).send('Test routes');
// });

router.post('/create', boardController.createBoard, (req, res) => {
  return res.status(200).send('Board created');
});

router.post('/update', boardController.updateBoard, (req, res) => {
  return res.status(200).send('successful update');
});

router.post('/delete', boardController.deleteBoard, (req, res) => {
  return res.status(200).send('board deleted');
});

module.exports = router;
