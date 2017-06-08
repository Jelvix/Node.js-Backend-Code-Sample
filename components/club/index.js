const AdminApp = require('./admin.routes');
const AuthController = require('../auth/auth.controller.js');
const {ADMIN_ROLE} = require('../../config/role.constatnts.js');

module.exports = app => {
  app.use('/admin', AuthController.authValidator(ADMIN_ROLE), AdminApp);
};
