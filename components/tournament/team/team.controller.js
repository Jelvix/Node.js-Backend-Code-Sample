const db = require('../../../config/db');
const CommonUtils = require('../../../utils/common.js');
const {BadRequestError, NotFoundError} = require('../../../utils/erros.model.js');
const TeamModel = require('./team.model.js')(db);
const TournamentModel = require('../tournament.model.js')(db);
const ClubModel = require('../../club/club.model.js')(db);

class Team {
  static async join(req, res) {
    const tournamentId = req.params.id;
    const userId = req.user.id;
    const {clubId} = req.body;

    try {
      const existingTournament = await TournamentModel.findById(tournamentId);
      if (!existingTournament) {
        throw new NotFoundError('The tournament not found.');
      }
      if (existingTournament.stopDate) {
        throw new BadRequestError('The tournament is stopped.');
      }
      if (existingTournament.startDate) {
        throw new BadRequestError('The tournament is active.');
      }

      const existingClub = await ClubModel.findById(clubId);
      if (!existingClub) {
        throw new NotFoundError('The club not found.');
      }

      const existingTeam = await TeamModel.find({where: {tournamentId, $or: [{userId}, {clubId}]}});
      if (existingTeam && existingTeam.userId === userId) {
        throw new BadRequestError('You are already a participant of the tournament.');
      }
      if (existingTeam && existingTeam.clubId === +clubId) {
        throw new BadRequestError(`Club with clubId "${clubId}" already in use.`);
      }

      await TeamModel.create({userId, clubId, tournamentId});

      return res.status(201).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async leave(req, res) {
    const tournamentId = req.params.id;
    const userId = req.user.id;

    try {
      const existingTournament = await TournamentModel.findById(tournamentId);
      if (!existingTournament) {
        throw new NotFoundError('The tournament not found.');
      }

      const team = await TeamModel.find({where: {userId}});
      if (!team) {
        throw new NotFoundError('You are not a participant of the tournament.');
      }

      await team.destroy();

      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(req, err);
    }
  }
}

module.exports = Team;
