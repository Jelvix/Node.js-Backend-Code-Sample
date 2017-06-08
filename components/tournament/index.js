const AdminApp = require('./admin.routes.js');
const UserApp = require('./../tournament/user.routes.js');
const AuthController = require('../auth/auth.controller.js');
const {ADMIN_ROLE, USER_ROLE} = require('../../config/role.constatnts.js');

module.exports = app => {
  app.use('/admin', AuthController.authValidator(ADMIN_ROLE), AdminApp);
  app.use('', AuthController.authValidator(USER_ROLE), UserApp);
};
