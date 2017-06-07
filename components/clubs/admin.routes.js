const app = require('express')();
const ClubsController = require('./clubs.controller');
const Validator = require('../../utils/validator.js');

/**
 * @api {post} /admin/clubs Create club
 * @apiName CreateClub
 * @apiGroup Club
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {String} title new Title.
 *
 * @apiSuccess {Object} club Club.
 * @apiSuccess {Int} club.id Id.
 * @apiSuccess {String} club.title Title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *   club: club
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
app.post('/clubs', Validator.titleValidator, ClubsController.add);

/**
 * @api {get} /admin/clubs Get all clubs
 * @apiName GetClubs
 * @apiGroup Club
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 *
 * @apiSuccess {Array} clubs Clubs List.
 * @apiSuccess {Object} club Club.
 * @apiSuccess {Int} club.id Id.
 * @apiSuccess {String} club.title Title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *   clubs: [club]
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
app.get('/clubs', Validator.limitOffsetValidator, ClubsController.getList);

/**
 * @api {put} /admin/clubs/:id Update club
 * @apiName UpdateClub
 * @apiGroup Club
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Club id.
 * @apiParam {String} title New title.
 *
 * @apiSuccess {Object} club Club.
 * @apiSuccess {Int} club.id Id.
 * @apiSuccess {String} club.title Title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *   club: club
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
app.put('/clubs/:id', Validator.titleValidator, Validator.idValidator, ClubsController.update);

/**
 * @api {delete} /admin/clubs/:id Delete club
 * @apiName DeleteClub
 * @apiGroup Club
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Club id.
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 204 OK
 *  {}
 *
 * @apiError {String} reason Error reason.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
   *    "reason": "DB error."
   *  }
 */
app.delete('/clubs/:id', Validator.idValidator, ClubsController.deleteById);

module.exports = app;
