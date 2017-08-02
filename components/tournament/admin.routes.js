const TournamentController = require('./../tournament/tournament.controller.js');
const MatchController = require('./match/match.controller.js');
const Validator = require('../../utils/validator.js');
const MatchService = require('./match/match.service.js');
const app = require('express')();

/**
 * @api {post} /admin/tournaments Create tournament
 * @apiName CreateTournament
 * @apiGroup Tournament
 * @apiPermission moderator
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {String} title Title.
 *
 * @apiSuccess {Object} tournament New tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "tournament": tournament
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
app.post('/tournaments', Validator.titleValidator, TournamentController.add);

/**
 * @api {put} /admin/tournaments/:id Update tournament
 * @apiName UpdateTournament
 * @apiGroup Tournament
 * @apiPermission moderator
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 * @apiParam {String} title Title.
 *
 * @apiSuccess {Object} tournament New tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "tournament": tournament
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
app.put('/tournaments/:id', Validator.idValidator, Validator.titleValidator, TournamentController.updateById);

/**
 * @api {delete} /admin/tournaments/:id Remove tournament
 * @apiName RemoveTournament
 * @apiGroup Tournament
 * @apiPermission moderator
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 * @apiParam {String} id Tournament id.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 204 OK
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

app.delete('/tournaments/:id', Validator.idValidator, TournamentController.deleteById);

/**
 * @api {post} /admin/tournaments/:id/start Start tournament
 * @apiName StartTournament
 * @apiGroup Tournament
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 *
 * @apiSuccess {Object} tournament New tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "tournament": tournament
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
app.post('/tournaments/:id/start', Validator.idValidator, TournamentController.start);

/**
 * @api {post} /admin/tournaments/:id/stop Stop tournament
 * @apiName StopTournament
 * @apiGroup Tournament
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 *
 * @apiSuccess {Object} tournament New tournament.
 * @apiSuccess {Int} tournament.id Id.
 * @apiSuccess {Int/null} tournament.startDate Start time.
 * @apiSuccess {Int/null} tournament.stopDate End time.
 * @apiSuccess {String} tournament.title Tournament's title.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "tournament": tournament
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
app.post('/tournaments/:id/stop', Validator.idValidator, TournamentController.stop);

/**
 * @api {post} admin/tournaments/:id/matches Create match
 * @apiName CreateMatch
 * @apiGroup Match
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 * @apiParam {Int} homeId Home user id.
 * @apiParam {Int} awayId Away user id.
 * @apiParam {Int} homeScored Home user id.
 * @apiParam {Int} awayScored Away user id.
 *
 * @apiSuccess {Object} match Added match.
 * @apiSuccess {Int} match.id Match Id.
 * @apiSuccess {Int} match.homeId Home team Id.
 * @apiSuccess {Int} match.awayId Away Team Id.
 * @apiSuccess {Int} match.awayScored Away Team scored.
 * @apiSuccess {Int} match.homeScored Home Team scored.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *    "match": match
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
app.post('/tournaments/:id/matches', Validator.idValidator, MatchService.matchValidator, MatchController.add);


/**
 * @api {put} admin/tournaments/:tournamentId/matches/:matchId Update match
 * @apiName UpdateMatch
 * @apiGroup Match
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} tournamentId Tournament id.
 * @apiParam {Int} matchId Match id.
 * @apiParam {Int} homeId Home user id.
 * @apiParam {Int} awayId Away user id.
 * @apiParam {Int} homeScored Home user id.
 * @apiParam {Int} awayScored Away user id.
 *
 * @apiSuccess {Object} match Updated match.
 * @apiSuccess {Int} match.id Match Id.
 * @apiSuccess {Int} match.homeId Home team Id.
 * @apiSuccess {Int} match.awayId Away Team Id.
 * @apiSuccess {Int} match.awayScored Away Team scored.
 * @apiSuccess {Int} match.homeScored Home Team scored.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "match": match
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
app.put('/tournaments/:tournamentId/matches/:matchId', MatchService.matchIdsValidator,
  MatchService.matchValidator, MatchController.update);

module.exports = app;
