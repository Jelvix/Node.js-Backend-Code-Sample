const {NotFoundError, BadRequestError} = require('../../../utils/erros.model.js');
const TeamModel = require('../team/team.model');
const TournamentModel = require('../tournament.model');
const MatchModel = require('./match.model');
const ValidatorUtils = require('../../../utils/validator.js');

class MatchService {
  static async createMatch(data) {
    const match = await MatchModel.create(data);
    return {
      tournamentId: match.tournamentId,
      homeId: match.homeId,
      awayId: match.awayId,
      homeScored: match.homeScored,
      awayScored: match.awayScored
    };
  }

  static async findMatchById(id) {
    return await MatchModel.findById(id);
  }

  static async updateMatch(matchId, data) {
    let match = await MatchModel.update(data, {where: {id: matchId}, returning: true});
    if (!match[0]) {
      throw new Error('DB error while updating the match.');
    }

    return {
      tournamentId: match[1][0].tournamentId,
      homeId: match[1][0].homeId,
      awayId: match[1][0].awayId,
      homeScored: match[1][0].homeScored,
      awayScored: match[1][0].awayScored
    };
  }

  static async getMatchesList(tournamentId) {
    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      throw new Error(`Tournament doesn't exists.`);
    }

    return await MatchModel.findAll({
      where: {
        tournamentId
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'deletedAt']
      }
    });
  }

  static async updateTeams(teams, info) {
    const {awayTeam, homeTeam} = teams;
    const {awayInfo, homeInfo} = info;

    await homeTeam.update(homeInfo);
    await awayTeam.update(awayInfo);
  }

  static calculateTable(teams, match) {
    const {awayTeam, homeTeam} = teams;

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
    if (match.awayScored > match.homeScored) {
      awayInfo.wins = awayTeam.wins + 1;
      awayInfo.points = awayTeam.points + 3;
      homeInfo.loses = homeTeam.loses + 1;
    }
    if (match.awayScored === match.homeScored) {
      awayInfo.points = awayTeam.points + 1;
      awayInfo.draws = awayTeam.draws + 1;
      homeInfo.points = homeTeam.points + 1;
      homeInfo.draws = homeTeam.draws + 1;
    }

    return {homeInfo, awayInfo};
  }

  static recalculateTable(teams, oldMatch, match) {
    const {awayTeam, homeTeam} = teams;

    const homeInfo = {
      scored: homeTeam.scored - oldMatch.homeScored + match.homeScored,
      missed: homeTeam.missed - oldMatch.awayScored + match.awayScored,
      draws: homeTeam.draws,
      wins: homeTeam.wins,
      loses: homeTeam.loses,
      points: homeTeam.points
    };
    const awayInfo = {
      scored: awayTeam.scored - oldMatch.awayScored + match.awayScored,
      missed: awayTeam.missed - oldMatch.homeScored + match.homeScored,
      draws: awayTeam.draws,
      wins: awayTeam.wins,
      loses: awayTeam.loses,
      points: awayTeam.points
    };

    if (oldMatch.homeScored > oldMatch.awayScored) {
      homeInfo.wins = homeTeam.wins - 1;
      homeInfo.points = homeTeam.points - 3;
      awayInfo.loses = awayTeam.loses - 1;
    }
    if (oldMatch.awayScored > oldMatch.homeScored) {
      awayInfo.wins = awayTeam.wins - 1;
      awayInfo.points = awayTeam.points - 3;
      homeInfo.loses = homeTeam.loses - 1;
    }
    if (oldMatch.awayScored === oldMatch.homeScored) {
      awayInfo.points = awayTeam.points - 1;
      awayInfo.draws = awayTeam.draws - 1;
      homeInfo.points = homeTeam.points - 1;
      homeInfo.draws = homeTeam.draws - 1;
    }

    if (match.homeScored > match.awayScored) {
      homeInfo.wins++;
      homeInfo.points += 3;
      awayInfo.loses++;
    }
    if (match.awayScored > match.homeScored) {
      awayInfo.wins++;
      awayInfo.points += 3;
      homeInfo.loses++;
    }
    if (match.awayScored === match.homeScored) {
      awayInfo.points++;
      awayInfo.draws++;
      homeInfo.points++;
      homeInfo.draws++;
    }

    return {awayInfo, homeInfo};
  }

  static async checkMatch(params) {
    const {tournamentId, homeId, awayId} = params;

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

    const awayTeam = await TeamModel.find({where: {id: awayId, tournamentId}});
    if (!awayTeam) {
      throw new NotFoundError(`Away Team doesn't exist.`);
    }

    return {homeTeam, awayTeam};
  }

  static async matchIdsValidator(req, res, next) {
    req.checkParams('tournamentId', 'tournamentId not valid.').notEmpty().isInt();
    req.checkParams('matchId', 'matchId not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async matchValidator(req, res, next) {
    req.checkBody('homeId', 'homeId is not valid.').notEmpty().isInt();
    req.checkBody('awayId', 'awayId is not valid.').notEmpty().isInt();
    req.checkBody('homeScored', 'homeScored is not valid.').notEmpty().isInt();
    req.checkBody('awayScored', 'awayScored is not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }
}

module.exports = MatchService;
