// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const { Pool } = require('pg');

const PG_URI =
  'postgres://zgnmchem:O-Yfyi4tnIrjfpg4-uaAgSIrKIihx59g@kashin.db.elephantsql.com/zgnmchem';

const pool = new Pool({
  connectionString: PG_URI,
});

// bcrypt
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

/**
 * DUMMY:
 * username: test, password: test, board_ids: [1]
 */

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   board_ids: [String],
// });

// userSchema.pre('save', function(next) {
//   // bcrypt.hash()
//   console.log('PRE SAVE', this.password);
//   return next();
// });
// userSchema.pre('find', function(next) {
//   // bcrypt.hash()
//   //'this' is not pulling the find inputs - why?
//   console.log('PRE FIND', this);
//   return next();
// })

// const User = mongoose.model("users", userSchema);

module.exports = pool;

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
