const Sequelize = require('sequelize');

module.exports = db => {
  db.define('team', {
    name: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    tournamentId: {
      type: Sequelize.INTEGER
    },
    clubId: {
      type: Sequelize.INTEGER
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
