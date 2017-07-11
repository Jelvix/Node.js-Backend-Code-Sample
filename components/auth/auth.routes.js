const AuthController = require('./auth.controller.js');
const AuthService = require('./auth.service');
const app = require('express')();
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
 *
 *  @apiSampleRequest
 */
app.post('/login', AuthController.loginValidator, AuthController.login);

/**
 * @api {post} /registration Registration
 * @apiName Registration
 * @apiGroup Auth
 * @apiPermission non-reg
 *
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 * @apiParam {String} name Name.
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
 *
 *  @apiSampleRequest
 */
app.post('/registration', AuthService.registrationValidator, AuthController.registration);

module.exports = app;
