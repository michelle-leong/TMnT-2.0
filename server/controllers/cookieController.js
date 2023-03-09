const cookieController = {};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('running cookieController.setSSIDCookie');
  // const cookieToken = res.locals.user._id
  res.cookie('ssid', res.locals.user._id.valueOf(), {
    // secure: true,
    httpOnly: true,
    maxAge: 300000,
  });
  return next();
};

module.exports = cookieController;
