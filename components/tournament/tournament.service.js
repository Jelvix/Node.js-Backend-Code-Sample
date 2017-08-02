const {NotFoundError, BadRequestError} = require('../../utils/erros.model.js');
const TournamentModel = require('./tournament.model');
const TeamModel = require('./team/team.model');
const MatchModel = require('./match/match.model');
const ClubModel = require('../club/club.model');

class TournamentService {
  static async findTournamentById(id) {
    const tournament = await TournamentModel.findById(id);
    if (!tournament) {
      throw new NotFoundError(`Tournament doesn't exist.`);
    }

    return tournament;
  }

  static async createTournament(data) {
    let tournament = await TournamentModel.create(data);

    if (!tournament) {
      throw new Error('Cannot create a tournament.');
    }

    return {
      id: tournament.id,
      title: tournament.title,
      startDate: tournament.startDate,
      stopDate: tournament.stopDate
    };
  }

  static async deleteTournament(id) {
    const tournament = await TournamentModel.destroy({where: {id}});
    if (!tournament) {
      throw new NotFoundError(`Tournament doesn't exist.`);
    }
  }

  static async getTournamentInfo(ids) {
    const {tournamentId, userId} = ids;
    const attributes = {exclude: ['createdAt', 'updatedAt', 'deletedAt']};
    const tournament = await TournamentModel.findById(tournamentId,
      {
        attributes,
        include: [
          {model: TeamModel, attributes},
          {model: MatchModel, attributes}
        ],
        order: [[{model: TeamModel, as: 'teams'}, 'points', 'DESC']]
      });

    if (!tournament) {
      throw new NotFoundError(`Tournament doesn't exist.`);
    }

    tournament.dataValues.teams = tournament.dataValues.teams.sort((a, b) => {
      if (a.points === b.points) {
        return a.scored - a.missed > b.scored - b.missed ? -1 : 1;
      }
      return 0;
    });

    tournament.dataValues.isJoined = tournament.teams.some(el => el.userId === userId);

    return tournament;
  }

  static async updateTournament(id, data) {
    const tournament = await TournamentService.findTournamentById(id);

    await tournament.update(data);

    return {
      title: tournament.title,
      stopDate: tournament.stopDate,
      startDate: tournament.startDate
    };
  }

  static async getAllTournaments(query) {
    let options = {
      offset: +query.offset || 0,
      limit: +query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'deletedAt']
      }
    };

    return await TournamentModel.findAll(options);
  }

  static async startTournament(id) {
    const tournament = await TournamentService.findTournamentById(id);

    if (tournament.stopDate) {
      throw new BadRequestError('The tournament has ended.');
    }

    if (tournament.startDate) {
      throw new BadRequestError('The tournament was already started.');
    }

    await tournament.update({startDate: Math.floor(Date.now() / 1000)});

    return {
      id: tournament.id,
      startDate: tournament.startDate,
      stopDate: tournament.stopDate,
      title: tournament.title
    };
  }

  static async stopTournament(id) {
    const tournament = await TournamentService.findTournamentById(id);

    if (tournament.stopDate) {
      throw new BadRequestError('The tournament was already stopped.');
    }

    if (!tournament.startDate) {
      throw new BadRequestError(`The tournament wasn't started.`);
    }

    await tournament.update({stopDate: Math.floor(Date.now() / 1000)});

    return {
      id: tournament.id,
      startDate: tournament.startDate,
      stopDate: tournament.stopDate,
      title: tournament.title
    };
  }

  static async getClubs(id) {
    await TournamentService.findTournamentById(id);

    const teams = await TeamModel.findAll({where: {tournamentId: id}});
    const clubIds = teams.map(el => {
      return el.clubId;
    });

    const options = {
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'deletedAt']
      }
    };
    if (teams.length) {
      options.where = {id: {$notIn: clubIds}};
    }

    return await ClubModel.findAll(options);
  }
}

module.exports = TournamentService;
