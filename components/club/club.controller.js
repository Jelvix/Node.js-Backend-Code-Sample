const CommonUtils = require('../../utils/common');
const db = require('../../config/db');
const {BadRequestError, NotFoundError} = require('../../utils/erros.model.js');
const ClubModel = require('./club.model.js')(db);

class Club {
  static async add(req, res) {
    const title = req.body.title;

    try {
      const existingClub = await ClubModel.find({where: {title}});
      if (existingClub) {
        throw new BadRequestError('The club already exist.');
      }

      let club = await ClubModel.create({title}, {returning: true});

      if (!club) {
        throw new Error('Cannot create a tournament.');
      }

      club = {id: club.id, title: club.title};

      return res.status(200).json({club});
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
      const clubs = await ClubModel.findAll(options);

      return res.status(200).json({clubs});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const title = req.body.title;

    try {
      let club = await ClubModel.findById(id);
      if (!club) {
        throw new NotFoundError(`The club doesn't exist.`);
      }

      const result = await club.update({title}, {returning: true});
      if (!result) {
        throw new Error('Cannot update a club.');
      }

      club = {id: result.id, title: result.title};

      return res.status(200).json({club});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteById(req, res) {
    const id = req.params.id;

    try {
      const club = await ClubModel.destroy({where: {id}});
      if (!club) {
        throw new NotFoundError(`Tournament doesn't exist.`);
      }

      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }

  }
}

module.exports = Club;
