const Sequelize = require('sequelize');

module.exports = db => {
  const UserModel = require('../../user/user.model')(db);
  const TournamentModel = require('../../tournament/tournament.model')(db);
  const ClubModel = require('../../club/club.model')(db);

  return db.define('team', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: UserModel,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    tournamentId: {
      type: Sequelize.INTEGER,
      references: {
        model: TournamentModel,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    clubId: {
      type: Sequelize.INTEGER,
      references: {
        model: ClubModel,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    scored: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    missed: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    wins: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    draws: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    loses: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {paranoid: true});
};
