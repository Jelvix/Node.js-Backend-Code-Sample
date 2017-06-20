const md5 = require('md5');
const db = require('../../config/db');
const UserModel = require('./user.model');
const TeamModel = require('../tournament/team/team.model');
require('../tournament/match/match.model');
const TournamentModel = require('../tournament/tournament.model');
const CommonUtils = require('../../utils/common');
const {NotFoundError, BadRequestError} = require('./../../utils/erros.model.js');

class User {
  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      const user = await UserModel.destroy({where: {id}});
      if (!user) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }


  static async getOneById(req, res) {
    const {id} = req.params;
    const options = {
      where: {id},
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      },
      raw: true
    };

    try {
      const user = await UserModel.findOne(options);
      if (!user) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static getMe(req, res) {
    const user = req.user;
    delete user.password;
    return res.status(200).json({user});
  }

  static async updateUser(req, res) {
    const {id} = req.params;
    const {name, email, role} = req.body;
    try {
      const existingUser = await UserModel.find({
        where: {
          email,
          id: {$ne: id}
        }
      });
      if (existingUser) {
        throw new BadRequestError(`User with email: "${email}" already exist.`);
      }

      return User.updateUserWithResponse({name, email, role}, id, res);
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateEmail(req, res) {
    const {email, password} = req.body;

    try {
      const existingUser = await UserModel.find({
        where: {
          email,
          id: {$ne: req.user.id}
        }
      });
      if (existingUser) {
        throw new BadRequestError(`User with email: "${email}" already exists.`);
      }

      const passwordMd5 = md5(password);
      if (req.user.password !== passwordMd5) {
        throw new BadRequestError(`Passwords do not match.`);
      }

      return await User.updateUserWithResponse({email}, req.user.id, res);
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateMame(req, res) {
    const name = req.body.name;
    try {
      return await User.updateUserWithResponse({name}, req.user.id, res);
    }
    catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updatePassword(req, res) {
    const {newPassword, oldPassword} = req.body;
    const oldPasswordMd5 = md5(oldPassword);

    try {
      if (oldPasswordMd5 !== req.user.password) {
        throw new BadRequestError('Old password is not correct.');
      }

      const newPasswordMd5 = md5(newPassword);
      const result = await UserModel.update({password: newPasswordMd5}, {where: {id: req.user.id}});
      if (!result[0]) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(204).json();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateUserWithResponse(data, id, res) {
    await UserModel.update(data, {where: {id}});

    const user = await UserModel.findById(id, {
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      }
    });
    if (!user) {
      throw new NotFoundError(`User doesn't exist.`);
    }

    return res.status(200).json({user});
  }

  static async getList(req, res) {
    const options = {
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      },
      raw: true
    };

    try {
      const users = await UserModel.findAll(options);
      return res.status(200).json({users});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getMyStatistics(req, res) {
    const userId = req.user.id;

    try {
      const statistics = await User.getStatistics(userId);

      return res.status(200).json({statistics});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getUserStatistics(req, res) {
    const userId = req.params.id;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new NotFoundError(`User doesn't exist.`);
      }

      const statistics = await User.getStatistics(userId);

      return res.status(200).json({statistics});
    } catch (err) {
      return CommonUtils.catchError(res, err);
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
}

module.exports = User;
