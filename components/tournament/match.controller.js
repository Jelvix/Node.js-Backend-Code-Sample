const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');
const TournamentModel = require('./tournament.model');
const MatchModel = require('./match.model');

class Match {
  static async addValidator(req, res, next) {
    req.checkBody('homeId', 'Home id not valid.').notEmpty().isInt();
    req.checkBody('awayId', 'Away id not valid.').notEmpty().isInt();
    req.checkBody('homeScored', 'Home scored not valid.').notEmpty().isInt();
    req.checkBody('awayScored', 'Away scored not valid.').notEmpty().isInt();
    req.checkBody('tournamentId', 'Tournament id scored not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async add(req, res) {
    const {tournamentId} = req.body;
    try {
      const tournament = await TournamentModel.findById(tournamentId);
      if (!tournament) {
        throw new Error('Tournament don\'t exists.')
      }
      const match = await MatchModel.create(req.body);
      return res.status(200).json({
        id: match.id,
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getByTournamentValidator(req, res, next) {
    req.checkParams('id', 'Tournament id not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async getByTournament(req, res) {
    const {id} = req.params;
    try {
      const tournament = await MatchModel.findById(id);
      console.log(tournament);
      if (!tournament) {
        throw new Error('Tournament don\'t exists.')
      }
      const match = await MatchModel.findAll({
        where: {
          tournamentId: id
        },
        attributes : {
          exclude: ['updatedAt']
        }
      });

      return res.status(200).json({
        match,
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Match;