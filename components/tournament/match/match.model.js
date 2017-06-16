const Sequelize = require('sequelize');

module.exports = db => {
  const TeamModel = require('../../tournament/team/team.model')(db);
  const TournamentModel = require('../../tournament/tournament.model')(db);

  return db.define('match', {
    tournamentId: {
      type: Sequelize.INTEGER,
      references: {
        model: TournamentModel,
        key: 'id'
      }
    },
    homeId: {
      type: Sequelize.INTEGER,
      references: {
        model: TeamModel,
        key: 'id'
      }
    },
    awayId: {
      type: Sequelize.INTEGER,
      references: {
        model: TeamModel,
        key: 'id'
      }
    },
    homeScored: {
      type: Sequelize.INTEGER
    },
    awayScored: {
      type: Sequelize.INTEGER
    }
  }, {paranoid: true});
};
