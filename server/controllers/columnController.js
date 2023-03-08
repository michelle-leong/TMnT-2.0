const pool = require('../models/userModel');

const columnController = {};

columnController.addColumn = async (req, res, next) => {
  try {
    const boardId = req.body.board_id;
    const columnName = req.body.name;
    const queryString = `INSERT INTO columns (name, board_id) VALUES ('${columnName}', ${boardId}) RETURNING *`;
    const response = await pool.query(queryString);
    res.locals.column = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'columnController.newColumn',
      message: { err: 'ERROR in columnController.newColumn' + err },
    });
  }
};
columnController.updateColumn = async (req, res, next) => {
  try {
    const columnId = req.body.id;
    const columnName = req.body.name;
    const queryString = `UPDATE columns SET name = '${columnName}' where _id = ${columnId} RETURNING *`;
    const response = await pool.query(queryString);
    console.log(`column id ${columnId} is updated`);
    res.locals.columnUpdate = response.rows;
    return next();
  } catch (err) {
    return next({
      log: 'columnController.updateColumn',
      message: { err: 'ERROR in columnController.updateColumn' },
    });
  }
};
columnController.deleteColumn = async (req, res, next) => {
  try {
    const columnId = req.body.id;
    const queryString = `DELETE FROM columns where _id = ${columnId}`;
    await pool.query(queryString);
    console.log(`column id ${columnId} deleted`);
    return next();
  } catch (err) {
    return next({
      log: 'columnController.deleteColumn',
      message: { err: 'ERROR in columnController.deleteColumn' },
    });
  }
};
module.exports = columnController;
