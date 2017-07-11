const md5 = require('md5');
const UserModel = require('./user.model');
const TeamModel = require('../tournament/team/team.model');
require('../tournament/match/match.model');
const TournamentModel = require('../tournament/tournament.model');
const {NotFoundError, BadRequestError} = require('./../../utils/erros.model.js');

class UserService {
  static async deleteUser(id) {
    const user = await UserModel.destroy({where: {id}});
    if (!user) {
      throw new NotFoundError(`User doesn't exist.`);
    }
  }

  static async getUsers(offset, limit) {
    const options = {
      offset: +offset || 0,
      limit: +limit || 30,
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      }
    };

    return await UserModel.findAll(options);
  }

  static async getUserById(id) {
    return await UserService.checkIfUserExist(id);
  }

  static async checkExistingEmail(id, email) {
    const existingUser = await UserModel.find({
      where: {
        email,
        id: {$ne: id}
      }
    });
    if (existingUser) {
      throw new BadRequestError(`User with email: "${email}" already exist.`);
    }
  }

  static async updateUser(id, data) {
    const user = await UserService.checkIfUserExist(id);

    await user.update(data);

    return {email: user.email, role: user.role, id: user.id, name: user.name};
  }

  static comparePasswords(password, compPassword) {
    const passwordMd5 = md5(compPassword);
    if (password !== passwordMd5) {
      throw new BadRequestError(`Passwords do not match.`);
    }
  }

  static async getStatistics(userId) {
    const teams = await TeamModel.findAll({where: {userId}, raw: true});
    let statistics = {
      totalMatches: 0,
      wins: 0,
      loses: 0,
      draws: 0,
      champion: 0
    };

    statistics = teams.reduce((prev, curr) => (
      {
        totalMatches: prev.wins + prev.loses + prev.draws + curr.wins + curr.loses + curr.draws,
        wins: prev.wins + curr.wins,
        loses: prev.loses + curr.loses,
        draws: prev.draws + curr.draws,
        champion: 0
      }
    ), statistics);


    const endedTournaments = await TournamentModel.findAll({
      where: {stopDate: {$not: null}},
      include: [{model: TeamModel, order: [['points', 'DESC']]}]
    });

    endedTournaments.forEach((tournament) => {
      tournament.teams = tournament.teams.sort((a, b) => {
        if (a.points === b.points) {
          return a.scored - a.missed > b.scored - b.missed ? -1 : 1;
        }
        return 0;
      });


      if (tournament.teams.length && tournament.teams[0].userId === userId) {
        statistics.champion++;
      }
    });

    return statistics;
  }

  static async checkIfUserExist(userId) {
    const options = {
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      }
    };

    const user = await UserModel.findById(userId, options);
    if (!user) {
      throw new NotFoundError(`User doesn't exist.`);
    }

    return user;
  }
}

module.exports = UserService;
