const TournamentController = require('./tournament.controller');
const MatchController = require('./match.controller');
const AuthController = require('../../middlewares/auth.controller.js');

module.exports = (app) => {
  /**
   * @api {post} /tournament Create tournament
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
   * @apiSuccess {Object} createdAt New tournament.
   * @apiSuccess {Int} scored Scored.
   * @apiSuccess {Int} missing Missing.
   * @apiSuccess {Int} games Games count.
   * @apiSuccess {Int} points Total points.
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
  app.post('/tournament', AuthController.authValidator(1), TournamentController.addValidator, TournamentController.add);

  /**
   * @api {get} /tournament Get tournament
   * @apiName GetTournament
   * @apiGroup Tournament
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {Int} offset=0 Start index of the results array.
   * @apiParam {Int} limit=30 Size of the results array. Max 100.
   *
   * @apiSuccess {array} tournament Tournaments list.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "tournaments": [tournaments]
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
  app.get('/tournament', AuthController.authValidator(0), TournamentController.getTournaments);

  /**
   * @api {delete} /tournament/:id Remove tournament
   * @apiName RemoveTournament
   * @apiGroup Tournament
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   * @apiParam {String} id Tournament id.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "Error db."
   *  }
   */
  app.delete('/tournament', AuthController.authValidator(1), TournamentController.deleteValidator, TournamentController.deleteById);

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
};
