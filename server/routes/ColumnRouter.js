const express = require('express');
const columnController = require('../controllers/columnController');
const router = express.Router();

//create new column on board
router.post('/create', columnController.addColumn, (req, res) => {
  return res.status(200).json(res.locals.column);
});

//update column name
router.patch('/update', columnController.updateColumn, (req, res) => {
  return res.status(200).json(res.locals.columnUpdate);
});

//delete column
router.delete('/delete', columnController.deleteColumn, (req, res) => {
  return res.status(200).send('deleted column successfully');
});

module.exports = router;
