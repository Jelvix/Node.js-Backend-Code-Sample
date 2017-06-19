const CommonUtils = require('../../utils/common');
const {BadRequestError, NotFoundError} = require('../../utils/erros.model.js');
const TeamModel = require('./team/team.model');
const ClubModel = require('../club/club.model');
const MatchModel = require('./match/match.model');
const TournamentModel = require('./tournament.model');

class Tournament {
  static async add(req, res) {
    const title = req.body.title;
    try {
      let tournament = await TournamentModel.create({title});
      tournament = await TournamentModel.findById(tournament.id, {
        attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
      });

      if (!tournament) {
        throw new Error('Cannot create a tournament.');
      }

      return res.status(201).json({
        tournament
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      const tournament = await TournamentModel.destroy({where: {id}});
      if (!tournament) {
        throw new NotFoundError(`Tournament doesn't exist.`);
      }
      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getById(req, res) {
    const tournamentId = req.params.id;
    try {
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

      tournament.dataValues.isJoined = tournament.teams.some(el => el.userId === req.user.id);

      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateById(req, res) {
    const {id} = req.params;
    const {title} = req.body;
    try {
      await TournamentModel.update({title}, {where: {id}});
      const tournament = await TournamentModel.findById(id, {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'deletedAt']
        }
      });

      if (!tournament) {
        throw new NotFoundError(`Tournament doesn't exist.`);
      }

      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    let options = {
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'deletedAt']
      }
    };

    try {
      const tournaments = await TournamentModel.findAll(options);
      return res.status(200).json({tournaments});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async start(req, res) {
    const {id} = req.params;
    try {
      let tournament = await TournamentModel.findById(id);

      if (!tournament) {
        throw new NotFoundError(`The Tournament doesn't exist.`);
      }

      if (tournament.stopDate) {
        throw new BadRequestError('The tournament has ended.');
      }

      if (tournament.startDate) {
        throw new BadRequestError('The tournament was already started.');
      }

      const result = await tournament.update({startDate: Math.floor(Date.now() / 1000)}, {returning: true});
      tournament = {
        id: result.id,
        startDate: result.startDate,
        stopDate: result.stopDate,
        title: result.title
      };
      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async stop(req, res) {
    const {id} = req.params;
    try {
      let tournament = await TournamentModel.findById(id);

      if (!tournament) {
        throw new NotFoundError(`The Tournament doesn't exist.`);
      }

      if (tournament.stopDate) {
        throw new BadRequestError('The tournament was already stopped.');
      }

      if (!tournament.startDate) {
        throw new BadRequestError(`The tournament wasn't started.`);
      }

      const result = await tournament.update({stopDate: Math.floor(Date.now() / 1000)}, {returning: true});
      tournament = {
        id: result.id,
        startDate: result.startDate,
        stopDate: result.stopDate,
        title: result.title
      };
      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getAvailableClubs(req, res) {
    const tournamentId = req.params.id;

    try {
      const existingTournament = await TournamentModel.findById(tournamentId);
      if (!existingTournament) {
        throw new NotFoundError(`The Tournament doesn't exist.`);
      }

      const teams = await TeamModel.findAll({where: {tournamentId}});
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

      const clubs = await ClubModel.findAll(options);
      return res.status(200).json({clubs});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Tournament;
