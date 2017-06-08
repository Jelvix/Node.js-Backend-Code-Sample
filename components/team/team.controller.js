const db = require('../../config/db');
const TeamModel = require('./team.model')(db);

class Team {
  static async add(req, res) {
    const tournamentId = req.params.id;
    const {name, userId, clubId} = req.body;

    try {
      const existingTeam = TeamModel.find({where: {tournamentId}, $or: [{userId}, {clubId}, {name}]});
      console.log(existingTeam);

    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Team;
