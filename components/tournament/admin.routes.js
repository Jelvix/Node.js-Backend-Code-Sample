const TournamentController = require('./../tournament/tournament.controller.js');
const MatchController = require('./match/match.controller.js');
const Validator = require('../../utils/validator.js');
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
 */
app.put('/tournaments/:id', Validator.idValidator, Validator.titleValidator, TournamentController.updateById);

/**
 * @api {delete} admin/tournament/:id Remove tournament
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
 */
app.post('/tournaments/:id/matches', Validator.idValidator, Validator.addMatchValidator, MatchController.add);

module.exports = app;
