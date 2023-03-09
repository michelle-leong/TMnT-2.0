const path = require('path');
const express = require('express');
const cors = require('cors');
// const genuuid = require('uuid');
const UserRouter = require('./routes/UserRouter');
const BoardRouter = require('./routes/BoardRouter');
const ColumnRouter = require('./routes/ColumnRouter');
const CardRouter = require('./routes/CardRouter');
const sessions = require('express-session');

const cookieParser = require('cookie-parser');

// setup app and port
const app = express();
const PORT = process.env.PORT || 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// enable ALL CORS requests
app.use(cors());

// handle requests for static files (bundle.js)
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// const currSession = {
//   secret: 'supersecret',
//   saveUninitialized: true,
//   cookie: { maxAge: 120000, secure: false },
//   resave: false,
// };

// app.set('trust proxy', 1);

// app.use(sessions(currSession));

// route handlers
app.use('/api/users', UserRouter);

// app.use('/api', (req, res, next) => {
//   if (!req.session.username) {
//     // res.redirect('http://localhost:3000/api/user/login');
//     return next({
//       log: 'no session found',
//       message: { err: 'no session found' },
//     });
//   } else {
//     return next();
//   }
// });
app.use('/api/boards', BoardRouter);
app.use('/api/columns', ColumnRouter);
app.use('/api/cards', CardRouter);

// server index.html
app.get('/', (req, res) => {
  console.log(`Get request for '/'.  sending index.html`);
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// define catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send('No page found at that location'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
