const ValidatorUtils = require('../../../utils/validator');
const db = require('../../../config/db');
const CommonUtils = require('../../../utils/common');
const {BadRequestError, NotFoundError} = require('../../../utils/erros.model.js');
const TournamentModel = require('../tournament.model')(db);
const TeamModel = require('../team/team.model')(db);
const MatchModel = require('./match.model')(db);

class Match {
  static async add(req, res) {
    const tournamentId = req.params.id;
    const {homeId, awayId, homeScored, awayScored} = req.body;
    try {
      if (homeId === awayId) {
        throw new BadRequestError('Teams are the same.');
      }

      const tournament = await TournamentModel.findById(tournamentId);
      if (!tournament) {
        throw new NotFoundError(`The tournament doesn't exists.`);
      }

      if (tournament.stopDate) {
        throw new BadRequestError('The tournament has ended.');
      }

      if (!tournament.startDate) {
        throw new BadRequestError('The tournament not started yet.');
      }

      const homeTeam = await TeamModel.find({where: {id: homeId, tournamentId}});
      if (!homeTeam) {
        throw new NotFoundError(`Home Team doesn't exist.`);
      }

      const awayTeam = await TeamModel.find({where: {id: homeId, tournamentId}});
      if (!awayTeam) {
        throw new NotFoundError(`Away Team doesn't exist.`);
      }

      const createData = {
        tournamentId,
        homeId,
        awayId,
        homeScored,
        awayScored
      };
      let match = await MatchModel.create(createData);
      match = {
        tournamentId: match.tournamentId,
        homeId: match.homeId,
        awayId: match.awayId,
        homeScored: match.homeScored,
        awayScored: match.awayScored
      };

      const homeInfo = {
        scored: homeTeam.scored + match.homeScored,
        missed: homeTeam.missed + match.awayScored
      };
      const awayInfo = {
        scored: awayTeam.scored + match.awayScored,
        missed: awayTeam.missed + match.homeScored
      };
      if (match.homeScored > match.awayScored) {
        homeInfo.wins = homeTeam.wins + 1;
        homeInfo.points = homeTeam.points + 3;
        awayInfo.loses = awayTeam.loses + 1;
      }
      if (match.awayScored > match.awayScored) {
        awayInfo.wins = awayTeam.wins + 1;
        awayInfo.points = awayTeam.points + 3;
        homeInfo.loses = homeTeam.loses + 1;
      }
      if (match.awayScored === match.awayScored) {
        awayInfo.points = awayTeam.points + 1;
        awayInfo.draws = awayTeam.draws + 1;
        homeInfo.points = homeTeam.points + 1;
        homeInfo.draws = homeTeam.draws + 1;
      }

      await homeTeam.update(homeInfo);
      await awayTeam.update(awayInfo);

      return res.status(200).json({match});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    const tournamentId = req.params.id;
    try {
      const tournament = await TournamentModel.findById(tournamentId);

      if (!tournament) {
        throw new Error(`Tournament doesn't exists.`);
      }
      const matches = await MatchModel.findAll({
        where: {
          tournamentId
        },
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'deletedAt']
        }
      });

      return res.status(200).json({matches});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Match;
