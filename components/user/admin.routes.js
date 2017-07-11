const UserController = require('./user.controller');
const Validator = require('../../utils/validator');
const app = require('express')();

/**
 * @api {get} /admin/users Get users list
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission admin
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
 *
 *  @apiSampleReques
 */
app.get('/users', Validator.limitOffsetValidator, UserController.getList);

/**
 * @api {get} /admin/users/:id Get user
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
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
 *
 *  @apiSampleReques
 */
app.get('/users/:id', Validator.idValidator, UserController.getOneById);

/**
 * @api {delete} /admin/users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
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
 *
 *  @apiSampleReques
 */
app.delete('/users/:id', Validator.idValidator, UserController.deleteById);


/**
 * @api {put} /admin/users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission admin
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
 *
 *  @apiSampleReques
 */
app.put('/users/:id', Validator.updateUserValidator, UserController.updateUser);

/**
 * @api {post} /admin/command Create new command
 * @apiName CreateCommand
 * @apiGroup Command
 * @apiPermission admin
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
 *
 *  @apiSampleReques
 */

module.exports = app;
