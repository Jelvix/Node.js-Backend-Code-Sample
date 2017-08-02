const CommonUtils = require('../../../utils/common.js');
const TeamService = require('./team.service');

class Team {
  static async join(req, res) {
    const tournamentId = req.params.id;
    const userId = req.user.id;
    const {clubId} = req.body;

    try {
      const ids = {tournamentId, userId, clubId};
      await TeamService.joinValidation(ids);
      await TeamService.join(ids);

      return res.status(201).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async leave(req, res) {
    const tournamentId = req.params.id;
    const userId = req.user.id;

    try {
      await TeamService.leaveValidation(tournamentId);
      await TeamService.leave({userId, tournamentId});

      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(req, err);
    }
  }
}

module.exports = Team;
