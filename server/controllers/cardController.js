const pool = require('../models/userModel');

const cardController = {};

//create a card and add to a column, return new card data to frontend
cardController.createCard = async (req, res, next) => {
  try {
    const { task, columnId } = req.body;
    const queryString = `INSERT INTO cards (task, column_id) 
    VALUES ('${task}', ${columnId}) RETURNING *`;
    const cardCreated = await pool.query(queryString);
    res.locals.cardCreated = cardCreated.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.createCard ' + err,
      message: { err: 'ERROR in cardController.createCard' + err },
    });
  }
};

//update a card task based on id
cardController.updateCard = async (req, res, next) => {
  try {
    const cardId = req.body.card_id;
    const newTask = req.body.task;
    const queryString = `UPDATE cards SET task = '${newTask}' WHERE _id = ${cardId} RETURNING *`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.updateCard ' + err,
      message: { err: 'ERROR in cardController.updateCard' + err },
    });
  }
};

//delete a card based on card id
cardController.deleteCard = async (req, res, next) => {
  try {
    const cardId = req.body.id;
    const queryString = `DELETE FROM cards
    WHERE _id = ${cardId}`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.deleteCard ' + err,
      message: { err: 'ERROR in cardController.deleteCard' + err },
    });
  }
};

//change column of a card
cardController.moveCard = async (req, res, next) => {
  try {
    const cardId = req.body.id;
    const newColumnId = req.body.columnId;
    const queryString = `UPDATE cards SET column_id = ${newColumnId} WHERE _id = ${cardId} RETURNING *`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.moveCard ' + err,
      message: { err: 'ERROR in cardController.moveCard ' + err },
    });
  }
};

module.exports = cardController;
