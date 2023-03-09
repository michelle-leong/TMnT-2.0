const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  console.log('running sessionControlled.isLoggedIn');
  // get SSID from cookie on request
  console.log('ssid cookie_id: ', req.cookies.ssid);

  // query the DB for a matching cookieID in the session document
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((session) => {
      console.log('query returned: ', session);
      // if there is a match - We're LOGGED IN - return next();
      if (session) {
        console.log(
          'Session.cookie matches req.cookies.ssid.  User isLoggedIn.  Moving on to next middleware'
        );
        return next();
      } else if (session.length === 0) {
        return next({
          log: 'error in sessionController.isLoggedIn: error in finding session in database',
          message: {
            err:
              'sessionController.isLoggedIn: error in finding session in database' +
              err,
          },
        });
      }
    })
    // if no match, redirect or something.  FAIL.
    .catch((err) => {
      return next({
        log: 'error in sessionController.isLoggedIn',
        message: { err: 'sessionController.isLoggedIn' + err },
      });
    });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  console.log('running sessionController.startSession');
  console.log('user: ', res.locals.user);
  Session.create({ cookieId: res.locals.user._id })
    .then((data) => {
      console.log('created new session: ', data);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in sessionController.startSession',
        message: { err: 'sessionController.startSession' + err },
      });
    });
};

// deleteSession - after a user clicks log out, delete session from session collection
sessionController.deleteSession = (req, res, next) => {
  Session.deleteOne({ cookieId: res.locals.user_id })
    .then((data) => {
      console.log('session is deleted', data);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in sessionController.deleteSession',
        message: { err: 'sessionController.deleteSession' + err },
      });
    });
};

module.exports = sessionController;
