const pool = require('../models/userModel');

const cardController = {};

// cardController.getCard = async (req, res, next) => {
//   try {
//   } catch (err) {}
// };

cardController.createCard = async (req, res, next) => {
  try {
    const columnId = req.body.id;
    const task = req.body.task;
    const queryString = `INSERT INTO cards (task, column_id) 
    VALUES ('${task}', ${columnId}) RETURNING *`;
    const cardCreated = await pool.query(queryString);
    // TODO: check cardCreated's value
    console.log(cardCreated.rows);
    res.locals.cardCreated = cardCreated.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.createCard',
      message: { err: 'ERROR in cardController.createCard' + err },
    });
  }
};

cardController.updateCard = async (req, res, next) => {
  try {
    const cardId = req.body.id;
    const newTask = req.body.task;
    const queryString = `UPDATE cards
    SET task = '${newTask}'
    WHERE _id = ${cardId} RETURNING *`;
    const cardUpdated = await pool.query(queryString);
    // TODO: check cardUpdated's value
    res.locals.cardUpdated = cardUpdated.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.updateCard',
      message: { err: 'ERROR in cardController.updateCard' + err },
    });
  }
};

cardController.deleteCard = async (req, res, next) => {
  try {
    const cardId = req.body.id;
    // query to delete card per id
    const queryString = `DELETE FROM cards
    WHERE _id = ${cardId}`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.deleteCard',
      message: { err: 'ERROR in cardController.deleteCard' + err },
    });
  }
};

cardController.moveCard = async (req, res, next) => {
  try {
    const cardId = req.body.id;
    const newColumnId = req.body.columnId;
    // query to delete card per id
    const queryString = `UPDATE cards
    SET column_id = ${newColumnId}
    WHERE _id = ${cardId} RETURNING *`;
    const movedCard = await pool.query(queryString);
    res.locals.movedCard = movedCard.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in cardController.deleteCard',
      message: { err: 'ERROR in cardController.deleteCard' + err },
    });
  }
};

module.exports = cardController;
