const AuthController = require('./../auth/auth.controller.js');
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
app.post('/registration', AuthController.registrationValidator, AuthController.registration);

module.exports = app;
