const Sequelize = require('sequelize');
const db = require('../../../config/db');

module.exports = db.define('match', {
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
  }
}, {paranoid: true});
