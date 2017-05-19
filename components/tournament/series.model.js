const Sequelize = require('sequelize');
const db = require('../../config/db');

const Series = db.define('series', {
  type: {
    type: Sequelize.STRING
  },
  tournamentId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Series;
