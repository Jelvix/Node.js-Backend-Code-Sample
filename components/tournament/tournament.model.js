const Sequelize = require('sequelize');

module.exports = db => {
 return db.define('tournament', {
    title: {
      type: Sequelize.STRING
    },
    startedAt: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    stoppedAt: {
      type: Sequelize.INTEGER,
      defaultValue: null
    }
  }, {paranoid: true})
};
