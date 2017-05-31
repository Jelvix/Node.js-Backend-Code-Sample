const AuthApp = require('./auth.routes');

module.exports = app => {
  app.use(AuthApp);
};
