const TournamentController = require('./tournament.controller');
const app = require('express')();

/**
 * @api {get} /tournaments Get tournament
 * @apiName GetTournaments
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} offset=0 Start index of the results array.
 * @apiParam {Int} limit=30 Size of the results array. Max 100.
 *
 * @apiSuccess {array} tournaments Tournaments list.
 * @apiSuccess {Object} tournament tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *    "tournaments": [tournament]
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
app.get('/tournaments', TournamentController.limitOffsetValidator, TournamentController.getList);

/**
 * @api {get} /tournaments/:id Get tournament
 * @apiName GetTournament
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 *
 * @apiSuccess {Object} tournament tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *    "tournaments": tournament
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
app.get('/tournaments/:id', TournamentController.idValidator, TournamentController.getById);

module.exports = app;
