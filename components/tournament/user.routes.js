const TournamentController = require('./tournament.controller');
const Validator = require('../../utils/validator.js');
const TeamController = require('./team/team.controller.js');
const app = require('express')();

/**
 * @api {get} /tournaments Get tournaments
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

app.get('/tournaments', Validator.limitOffsetValidator, TournamentController.getList);

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
app.get('/tournaments/:id', Validator.idValidator, TournamentController.getById);

/**
 * @api {post} /tournaments/:id/join Join tournament
 * @apiName JoinTournament
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} tournamentId Tournament Id.
 * @apiParam {Int} clubId Id of available club.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 204 OK
 *  { }
 *
 * @apiError {String} reason Error reason.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
   *    "reason": "Error db."
   *  }
 */
app.post('/tournaments/:id/join', Validator.idValidator, Validator.joinTournamentValidator, TeamController.join);

/**
 * @api {get} /tournaments/:id/leave Leave tournament
 * @apiName LeaveTournament
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} tournamentId Tournament Id.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 204 OK
 *  { }
 *
 * @apiError {String} reason Error reason.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
   *    "reason": "Error db."
   *  }
 */
app.get('/tournaments/:id/leave', Validator.idValidator, TeamController.leave);

module.exports = app;
