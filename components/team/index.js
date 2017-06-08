const AdminApp = require('./admin.routes.js');
const AuthController = require('../auth/auth.controller.js');
const {ADMIN_ROLE} = require('../../config/role.constatnts.js');

module.exports = app => {
  app.use('/admin/tournaments', AuthController.authValidator(ADMIN_ROLE), AdminApp);
};
