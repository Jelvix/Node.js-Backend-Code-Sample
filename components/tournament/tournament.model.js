const Sequelize = require('sequelize');
const db = require('../../config/db');

const model = db.define('tournament', {
  title: {
    type: Sequelize.STRING
  },
  startDate: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  stopDate: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
}, {paranoid: true});

model.hasMany(db.models.match);
model.hasMany(db.models.team);

module.exports = model;
