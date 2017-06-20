const UserApp = require('./user.routes');
const AdminApp = require('./admin.routes');
const AuthController = require('./../auth/auth.controller.js');
const {USER_ROLE, ADMIN_ROLE} = require('../../config/role.constatnts.js');

module.exports = app => {
  app.use('', AuthController.authValidator(USER_ROLE), UserApp);
  app.use('/admin', AuthController.authValidator(ADMIN_ROLE), AdminApp);
};
