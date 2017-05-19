const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');
const TournamentModel = require('./tournament.model');

class Tournament {
  static async addValidator(req, res, next) {
    req.checkBody('title', 'Title not valid.').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async add(req, res) {
    const title = req.body.title;
    try {
      const userOld = await TournamentModel.find({
        where: {
          title
        }
      });
      if (userOld) {
        throw new Error('Tournament already exists.')
      }
      const tournament = await TournamentModel.create({
        title
      });
      return res.status(200).json({
        tournament,
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteValidator(req, res, next) {
    req.checkBody('id', 'Id not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async deleteById(req, res) {
    const {id} = req.body;
    try {
      await TournamentModel.destroy({
        where: {
          id
        }
      });
      return res.status(200).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getTournaments(req, res) {
    let options = {
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes : {
        exclude: ['updatedAt']
      }
    };

    if (isNaN(options.offset) || isNaN(options.limit)) {
      return res.status(400).json({
        reason: 'Invalid request options.'
      });
    }
    try {
      const tournaments = await TournamentModel.findAll(options);
      return res.status(200).json({tournaments});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Tournament;