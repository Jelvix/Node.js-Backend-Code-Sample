const TournamentController = require('./tournament.controller');
const MatchController = require('./match.controller');
const AuthController = require('../auth/auth.controller.js');
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
app.post('/tournaments', TournamentController.titleValidator, TournamentController.add);

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
app.put('/tournaments/:id', TournamentController.idValidator, TournamentController.titleValidator, TournamentController.updateById);

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

app.delete('/tournaments/:id', TournamentController.idValidator, TournamentController.deleteById);

/**
 * @api {get} /admin/tournaments/:id/start Start tournament
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
app.get('/tournaments/:id/start', TournamentController.idValidator, TournamentController.start);

/**
 * @api {get} /admin/tournaments/:id/stop Stop tournament
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
app.get('/tournaments/:id/stop', TournamentController.idValidator, TournamentController.stop);

/**
 * @api {post} /match Create match
 * @apiName CreateMatch
 * @apiGroup Match
 * @apiPermission moderator
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} homeId Home user id.
 * @apiParam {Int} awayId Away user id.
 * @apiParam {Int} homeScored Home user id.
 * @apiParam {Int} awayScored Away user id.
 * @apiParam {Int} tournamentId Tournament id.
 *
 * @apiSuccess {Int} id Match id.
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
   *    "id": 10
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
app.post('/match', AuthController.authValidator(1), MatchController.addValidator, MatchController.add);

/**
 * @api {get} /match/:id Get match by tournament id
 * @apiName GetMatch
 * @apiGroup Match
 * @apiPermission user
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {Int} id Tournament id.
 *
 * @apiSuccess {Array} match Match list.
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
 */
app.get('/match/:id', AuthController.authValidator(0), MatchController.getByTournamentValidator, MatchController.getByTournament);

module.exports = app;
