const express = require('express');
const columnController = require('../controllers/columnController');
const router = express.Router();

router.post('/new', columnController.addColumn, (req, res) => {
  return res.status(200).json(res.locals.column);
});

router.patch('/update', columnController.updateColumn, (req, res) => {
  return res.status(200).json(res.locals.columnUpdate);
});

router.delete('/delete', columnController.deleteColumn, (req, res) => {
  return res.status(200).send('deleted column successfully');
});

module.exports = router;
