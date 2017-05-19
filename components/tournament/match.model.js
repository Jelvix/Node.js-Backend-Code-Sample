const Sequelize = require('sequelize');
const db = require('../../config/db');

const Match = db.define('match', {
  createdAt: {
    type: Sequelize.INTEGER,
    defaultValue: (Date.now() / 1000)
  },
  tournamentId: {
    type: Sequelize.INTEGER
  },
  homeId: {
    type: Sequelize.INTEGER
  },
  awayId: {
    type: Sequelize.INTEGER
  },
  homeScored: {
    type: Sequelize.INTEGER
  },
  awayScored: {
    type: Sequelize.INTEGER
  },
});

module.exports = Match;
