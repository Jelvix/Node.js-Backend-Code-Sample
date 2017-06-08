const TeamController = require('./team.controller');
const Validator = require('../tournament/tournament.controller.js');
const app = require('express')();

/**
 * @api {post} /admin/tournaments/teams Create team
 * @apiName CreateTeam
 * @apiGroup Team
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {String} title Title.
 *
 * @apiSuccess {Object} team New tournament.
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
app.post('/:id/teams', Validator.idValidator, TeamController.add);

module.exports = app;
