const AdminApp = require('./admin.routes');
const UserApp = require('./user.routes');
const AuthController = require('../auth/auth.controller');
const {ADMIN_ROLE, USER_ROLE} = require('../../config/role.constatnts');

module.exports = app => {
  app.use('/admin', AuthController.authValidator(ADMIN_ROLE), AdminApp);
  app.use('', AuthController.authValidator(USER_ROLE), UserApp);
};
