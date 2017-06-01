const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');
const {BadRequestError, NotFoundError} = require('../../utils/erros.model.js');
const db = require('../../config/db');
const TournamentModel = require('./tournament.model')(db);

class Tournament {
  static async addValidator(req, res, next) {
    req.checkBody('title', 'Title not valid.').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

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

      return res.status(200).json({
        tournament
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async idValidator(req, res, next) {
    req.checkParams('id', 'Id not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
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
      if (Number.isNaN(options.offset) || Number.isNaN(options.limit)) {
        throw new BadRequestError('Invalid request options.');
      }

      const tournaments = await TournamentModel.findAll(options);
      return res.status(200).json({tournaments});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Tournament;
