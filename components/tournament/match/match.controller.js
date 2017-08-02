const CommonUtils = require('../../../utils/common');
const {BadRequestError, NotFoundError} = require('../../../utils/erros.model.js');
const MatchService = require('./match.service');

class Match {
  static async add(req, res) {
    const tournamentId = req.params.id;
    const {homeId, awayId, homeScored, awayScored} = req.body;
    try {
      const {homeTeam, awayTeam} = await MatchService.checkMatch({tournamentId, homeId, awayId});

      const createData = {
        tournamentId,
        homeId,
        awayId,
        homeScored,
        awayScored
      };
      const match = await MatchService.createMatch(createData);

      const teams = {homeTeam, awayTeam};
      const {homeInfo, awayInfo} = MatchService.calculateTable(teams, match);

      await MatchService.updateTeams(teams, {homeInfo, awayInfo});

      return res.status(200).json({match});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async update(req, res) {
    const {tournamentId, matchId} = req.params;
    const {homeId, awayId, homeScored, awayScored} = req.body;
    try {
      const oldMatch = await MatchService.findMatchById(matchId);
      if (!oldMatch) {
        throw new NotFoundError(`The match doesn't exists.`);
      }

      if (oldMatch.awayId !== +awayId || oldMatch.homeId !== +homeId) {
        throw new BadRequestError('Changing the team is forbidden.');
      }

      const {homeTeam, awayTeam} = await MatchService.checkMatch({tournamentId, homeId, awayId});

      const updateData = {
        tournamentId,
        homeId,
        awayId,
        homeScored,
        awayScored
      };

      const match = await MatchService.updateMatch(matchId, updateData);

      const teams = {homeTeam, awayTeam};
      const {homeInfo, awayInfo} = MatchService.recalculateTable(teams, oldMatch, match);

      await MatchService.updateTeams(teams, {homeInfo, awayInfo});

      return res.status(200).json({match});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    const tournamentId = req.params.id;
    try {
      const matches = await MatchService.getMatchesList(tournamentId);
      return res.status(200).json({matches});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Match;
