const CommonUtils = require('../../utils/common');
const TournamentService = require('./tournament.service');

class Tournament {
  static async add(req, res) {
    const title = req.body.title;
    try {
      const tournament = await TournamentService.createTournament({title});

      return res.status(201).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      await TournamentService.deleteTournament(id);
      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getById(req, res) {
    const tournamentId = req.params.id;
    const userId = req.user.id;
    try {
      const ids = {tournamentId, userId};
      const tournament = await TournamentService.getTournamentInfo(ids);

      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateById(req, res) {
    const {id} = req.params;
    const {title} = req.body;
    try {
      const tournament = await TournamentService.updateTournament(id, {title});
      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    try {
      const tournaments = await TournamentService.getAllTournaments(req.query);
      return res.status(200).json({tournaments});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async start(req, res) {
    const {id} = req.params;
    try {
      const tournament = await TournamentService.startTournament(id);
      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async stop(req, res) {
    const {id} = req.params;
    try {
      const tournament = await TournamentService.stopTournament(id);
      return res.status(200).json({tournament});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getAvailableClubs(req, res) {
    const tournamentId = req.params.id;

    try {
      const clubs = await TournamentService.getClubs(tournamentId);
      return res.status(200).json({clubs});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Tournament;
