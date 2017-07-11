const UserController = require('./user.controller');
const Validator = require('../../utils/validator.js');
const app = require('express')();

/**
 * @api {get} /me Get my profile
 * @apiName GetMyProfile
 * @apiGroup User
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
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
app.get('/me/', UserController.getMe);

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
 *
 *  @apiSampleReques
 */
app.put('/me/name', Validator.updateNameValidator, UserController.updateMame);

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
 *
 *  @apiSampleReques
 */
app.put('/me/password', Validator.updatePasswordValidator, UserController.updatePassword);

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
 *
 *  @apiSampleReques
 */
app.put('/me/email', Validator.updateEmailValidator, UserController.updateEmail);

/**
 * @api {get} /me/statistics Get my statistics
 * @apiName GetMyStatistics
 * @apiGroup User
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiSuccess {Object} statistics Statistics.
 * @apiSuccess {Int} statistics.totalMatches Total matches.
 * @apiSuccess {String} statistics.wins Total wins.
 * @apiSuccess {String} statistics.loses Total loses.
 * @apiSuccess {Int} statistics.champion Number of won championships .
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   statistics: statistics
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
app.get('/me/statistics', UserController.getMyStatistics);

/**
 * @api {get} /users/:id/statistics Get user statistics
 * @apiName GetUserStatistics
 * @apiGroup User
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {String} id User id.
 *
 * @apiSuccess {Object} statistics Statistics.
 * @apiSuccess {Int} statistics.totalMatches Total matches.
 * @apiSuccess {String} statistics.wins Total wins.
 * @apiSuccess {String} statistics.loses Total loses.
 * @apiSuccess {Int} statistics.champion Number of won championships .
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   statistics: statistics
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
app.get('/users/:id/statistics', Validator.idValidator, UserController.getUserStatistics);

module.exports = app;
