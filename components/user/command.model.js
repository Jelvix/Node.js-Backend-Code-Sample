const Sequelize = require('sequelize');
const db = require('../../config/db');

const Command = db.define('command', {
  title: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.INTEGER,
    defaultValue: (Date.now() / 1000)
  },
});

module.exports = Command;
