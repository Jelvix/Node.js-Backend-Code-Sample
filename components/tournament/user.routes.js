const TournamentController = require('./tournament.controller');
const Validator = require('../../utils/validator.js');
const TeamController = require('./team/team.controller.js');
const MatchController = require('./match/match.controller');
const TeamService = require('./team/team.service');
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
 *
 *  @apiSampleRequest
 */

app.get('/tournaments', Validator.limitOffsetValidator, TournamentController.getList);

/**
 * @api {get} /tournaments/:id Get tournament info
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
 * @apiSuccess {Array} tournament.teams Joined teams list.
 * @apiSuccess {Object} team Joined team list.
 * @apiSuccess {Int} team.id Team Id.
 * @apiSuccess {Int} team.tournamentId Tournament Id.
 * @apiSuccess {Int} team.scored Team scored.
 * @apiSuccess {Int} team.missed Team messed.
 * @apiSuccess {Int} team.wins Team's wins.
 * @apiSuccess {Int} team.loses Team's loses.
 * @apiSuccess {Int} team.draws Team's draws.
 * @apiSuccess {Array} tournament.matches Tournament's matches.
 * @apiSuccess {Object} match Tournament's match.
 * @apiSuccess {Int} match.id Team Id.
 * @apiSuccess {Int} match.tournamentId Tournament Id.
 * @apiSuccess {Int} match.homeId Home Team Id.
 * @apiSuccess {Int} match.awayId Away Team Id.
 * @apiSuccess {Int} match.homeScored Home Team scored.
 * @apiSuccess {Int} match.awayScored Away Team scored.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "tournament": {
 *      tournament,
 *      teams: [team],
 *      matches: [match]
 *    }
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
app.get('/tournaments/:id', Validator.idValidator, TournamentController.getById);

/**
 * @api {post} /tournaments/:id/join Join tournament
 * @apiName JoinTournament
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament Id.
 * @apiParam {Int} clubId Id of available club.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 *  { }
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
app.post('/tournaments/:id/join', Validator.idValidator, TeamService.clubIdValidator, TeamController.join);

/**
 * @api {post} /tournaments/:id/leave Leave tournament
 * @apiName LeaveTournament
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament Id.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 *  { }
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
app.post('/tournaments/:id/leave', Validator.idValidator, TeamController.leave);


/**
 * @api {get} /tournaments/:id/clubs Available clubs in tournament
 * @apiName AvailableClubs
 * @apiGroup Tournament
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament Id.
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
 *
 *  @apiSampleRequest
 */
app.get('/tournaments/:id/clubs', Validator.idValidator, TournamentController.getAvailableClubs);

/**
 * @api {get} /tournaments/:id/matches Get matches list
 * @apiName GetMatch
 * @apiGroup Match
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 *
 * @apiSuccess {Array} matches Matches list.
 * @apiSuccess {Object} match Matches list.
 * @apiSuccess {Int} match.homeId Id home user.
 * @apiSuccess {Int} match.awayId Id away user.
 * @apiSuccess {Int} match.homeScored Scored home user.
 * @apiSuccess {Int} match.awayScored Scored home user.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "matches": [match]
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
app.get('/tournaments/:id/matches', Validator.idValidator, MatchController.getList);

module.exports = app;
