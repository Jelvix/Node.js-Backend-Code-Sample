const app = require('express')();
const ClubController = require('./club.controller.js');
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
 *
 *  @apiSampleReques
 */
app.post('/clubs', Validator.titleValidator, ClubController.add);

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
 *
 *  @apiSampleRequest
 */
app.get('/clubs', Validator.limitOffsetValidator, ClubController.getList);

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
 *
 *  @apiSampleRequest
 */
app.put('/clubs/:id', Validator.titleValidator, Validator.idValidator, ClubController.update);

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
 *
 *  @apiSampleRequest
 */
app.delete('/clubs/:id', Validator.idValidator, ClubController.deleteById);

module.exports = app;
