const UserController = require('./user.controller');
const Validator = require('../../utils/validator.js');
const app = require('express')();

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
app.put('/name', Validator.updateNameValidator, UserController.updateMame);


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
app.put('/password', Validator.updatePasswordValidator, UserController.updatePassword);

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
app.put('/email', Validator.updateEmailValidator, UserController.updateEmail);

module.exports = app;
