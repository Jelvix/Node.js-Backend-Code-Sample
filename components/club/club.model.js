const Sequelize = require('sequelize');
const db = require('../../config/db');

module.exports = db.define('club', {
  title: {
    type: Sequelize.STRING
  }
}, {paranoid: true});
