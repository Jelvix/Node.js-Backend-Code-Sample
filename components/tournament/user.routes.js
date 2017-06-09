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
 * @api {post} /tournaments/:id/leave Leave tournament
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
app.post('/tournaments/:id/leave', Validator.idValidator, TeamController.leave);


/**
 * @api {get} /tournaments/:id/clubs Available clubs in tournament
 * @apiName AvailableClubs
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} tournamentId Tournament Id.
 *
 * @apiSuccess {Array} clubs Available clubs.
 * @apiSuccess {Object} club tournament.
 * @apiSuccess {Int} club.id Id.
 * @apiSuccess {String} club.title Tournament's title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    clubs: [club]
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
app.get('/tournaments/:id/clubs', Validator.idValidator, TournamentController.getAvailableClubs);

module.exports = app;
