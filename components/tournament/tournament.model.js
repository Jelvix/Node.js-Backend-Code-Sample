const Sequelize = require('sequelize');

module.exports = db => {
 return db.define('tournament', {
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
  }, {paranoid: true})
};
