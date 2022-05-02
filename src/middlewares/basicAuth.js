const mwBasicAuth = (req, res, next) => {
  //   console.log('middleware:basic auth');
  next();
};

module.exports = mwBasicAuth;
