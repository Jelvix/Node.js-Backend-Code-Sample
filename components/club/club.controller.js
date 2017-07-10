const CommonUtils = require('../../utils/common');
const ClubService = require('./club.service.js');

class Club {
  static async add(req, res) {
    const title = req.body.title;

    try {
      const club = await ClubService.createClub(title);

      return res.status(200).json({club});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    try {
      const clubs = await ClubService.getClubs(req.query);

      return res.status(200).json({clubs});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const title = req.body.title;

    try {
      const club = await ClubService.updateClub(id, title);

      return res.status(200).json({club});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteById(req, res) {
    const id = req.params.id;

    try {
      await ClubService.deleteClub(id);

      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }

  }
}

module.exports = Club;
