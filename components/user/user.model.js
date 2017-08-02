const Sequelize = require('sequelize');
const db = require('../../config/db');

module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {paranoid: true});

