const UserController = require('./user.controller');
const CommandController = require('./command.controller');
const AuthController = require('./auth.controller');

module.exports = app => {
  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission non-reg
   *
   * @apiParam {String} email Email.
   * @apiParam {String} password Password.
   *
   * @apiSuccess {Int} id User id.
   * @apiSuccess {Int} api_token Auth token.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "...",
   *    "api_token": "..."
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "Error db."
   *  }
   */
  app.post('/login', AuthController.loginValidator, AuthController.login);

  /**
   * @api {post} /registration Registration
   * @apiName Registration
   * @apiGroup User
   * @apiPermission non-reg
   *
   * @apiParam {String} email Email.
   * @apiParam {String} password Password.
   *
   * @apiSuccess {Int} id User id.
   * @apiSuccess {Int} api_token Auth token.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "...",
   *    "api_token": "..."
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "User already exists."
   *  }
   */
  app.post('/registration', UserController.registrationValidator, UserController.registration);

  /**
   * @api {post} /command Create new command
   * @apiName CreateCommand
   * @apiGroup Command
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {String} userId User id.
   * @apiParam {String} title Command name.
   *
   * @apiSuccess {Int} id Command id.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": 10
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "User don't exists."
   *  }
   */
  app.post('/command', AuthController.authValidator(1), CommandController.addValidator, CommandController.add);

  /**
   * @api {delete} /command/:id Remove command
   * @apiName RemoveCommand
   * @apiGroup Command
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {Int} id Id.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "Command don't exists."
   *  }
   */
  app.delete('/command/:id', AuthController.authValidator(1), CommandController.deleteValidator, CommandController.deleteById);

  /**
   * @api {get} /me/command Get my commands
   * @apiName MyCommands
   * @apiGroup Command
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiSuccess {Array} command Commands list.
   * @apiSuccess {Int} commands.id Id.
   * @apiSuccess {String} commands.title Title.

   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "commands": [command]
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.get('/me/command', AuthController.authValidator(), CommandController.myCommands);


  /**
   * @api {get} /users Get users list
   * @apiName GetUsers
   * @apiGroup User
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {Int} offset=0 Start index of the results array.
   * @apiParam {Int} limit=30 Size of the results array.
   *
   * @apiSuccess {Array} user Users list.
   * @apiSuccess {Int} user.id Id.
   * @apiSuccess {String} user.name Name.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {Int} user.role Role.

   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "users": [user]
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.get('/users', AuthController.authValidator(1), UserController.getList);

  /**
   * @api {get} /users/:id Get user
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {int} id UserId
   *
   * @apiSuccess {Object} user User.
   * @apiSuccess {Int} user.id Id.
   * @apiSuccess {String} user.name Name.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {Int} user.role Role.

   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": user
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.get('/users/:id', AuthController.authValidator(1), UserController.getByIdValidator, UserController.getOneById);

  /**
   * @api {delete} /users/:id Delete user
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {int} id UserId
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.delete('/users/:id', AuthController.authValidator(1), UserController.getByIdValidator, UserController.deleteById);


  /**
   * @api {put} /users/:id Update user
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {int} id UserId
   * @apiParam {String} email Email.
   * @apiParam {String} name Name.
   * @apiParam {int} role user's permission.
   *
   * @apiSuccess {Object} user User.
   * @apiSuccess {Int} user.id Id.
   * @apiSuccess {String} user.name Name.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {Int} user.role Role.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *   user: user
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.put('/users/:id', AuthController.authValidator(1), UserController.updateUserValidator, UserController.updateUser);

  /**
   * @api {put} /me/email Update email
   * @apiName UpdateEmail
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {String} email new Email.
   * @apiParam {String} password Password.
   *
   * @apiSuccess {Object} user User.
   * @apiSuccess {Int} user.id Id.
   * @apiSuccess {String} user.name Name.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {Int} user.role Role.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *   user: user
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.put('/me/email', AuthController.authValidator(0), UserController.updateEmailValidator, UserController.updateEmail);

  /**
   * @api {put} /me/name Update name
   * @apiName UpdateName
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {String} name new Name.
   *
   * @apiSuccess {Object} user User.
   * @apiSuccess {Int} user.id Id.
   * @apiSuccess {String} user.name Name.
   * @apiSuccess {String} user.email Email.
   * @apiSuccess {Int} user.role Role.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *   user: user
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.put('/me/name', AuthController.authValidator(0), UserController.updateNameValidator, UserController.updateMame);


  /**
   * @api {put} /me/password Update password
   * @apiName UpdatePassword
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {String} oldPassword Old password.
   * @apiParam {String} newPassword New password.
   *
   * @apiSuccess {String} reason Success message.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *   reason: password has been updated successfully.
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.put('/me/password', AuthController.authValidator(0), UserController.updatePasswordValidator, UserController.updatePassword);
};
