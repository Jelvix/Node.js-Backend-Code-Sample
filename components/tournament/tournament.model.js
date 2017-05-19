const Sequelize = require('sequelize');
const db = require('../../config/db');

const Tournament = db.define('tournament', {
  title: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.INTEGER,
    defaultValue: (Date.now() / 1000)
  },
  scored: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  missing: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  games: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Tournament;
