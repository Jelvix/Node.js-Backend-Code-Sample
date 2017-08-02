const {NotFoundError, BadRequestError} = require('../../../utils/erros.model.js');
const TournamentModel = require('../tournament.model');
const ClubModel = require('../../club/club.model');
const TeamModel = require('../team/team.model');
const ValidatorUtils = require('../../../utils/validator.js');

class TeamService {
  static async join(ids) {
    await TeamModel.create(ids);
  }

  static async leave(ids) {
    const {userId, tournamentId} = ids;

    const team = await TeamModel.find({where: {userId, tournamentId}});
    if (!team) {
      throw new NotFoundError('You are not a participant of the tournament.');
    }

    await team.destroy();
  }

  static async checkIfTournamentExist(id) {
    const tournament = await TournamentModel.findById(id);
    if (!tournament) {
      throw new NotFoundError('The tournament not found.');
    }

    return tournament;
  }

  static async joinValidation(ids) {
    const {tournamentId, clubId, userId} = ids;

    const existingTournament = await TeamService.checkIfTournamentExist(tournamentId);

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
  }

  static async leaveValidation(tournamentId) {
    await TeamService.checkIfTournamentExist(tournamentId);
  }

  static async clubIdValidator(req, res, next) {
    req.checkBody('clubId', 'clubId is not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }
}

module.exports = TeamService;
