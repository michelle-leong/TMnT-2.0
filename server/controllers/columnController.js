const pool = require('../models/userModel');

const columnController = {};

//create a new column and return to frontend
columnController.addColumn = async (req, res, next) => {
  try {
    const boardId = req.body.board_id;
    const columnName = req.body.name;
    const queryString = `INSERT INTO columns (name, board_id) VALUES ('${columnName}', ${boardId}) RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.column = response.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'columnController.newColumn',
      message: { err: 'ERROR in columnController.newColumn' + err },
    });
  }
};

//update column name;
columnController.updateColumn = async (req, res, next) => {
  try {
    const columnId = req.body.id;
    const columnName = req.body.name;
    const queryString = `UPDATE columns SET name = '${columnName}' where _id = ${columnId} RETURNING *`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'columnController.updateColumn ' + err,
      message: { err: 'ERROR in columnController.updateColumn' },
    });
  }
};

//delete column;
columnController.deleteColumn = async (req, res, next) => {
  try {
    const columnId = req.body.id;
    const queryString = `DELETE FROM columns where _id = ${columnId}`;
    await pool.query(queryString);
    return next();
  } catch (err) {
    return next({
      log: 'columnController.deleteColumn ' + err,
      message: { err: 'ERROR in columnController.deleteColumn ' + err },
    });
  }
};
module.exports = columnController;
