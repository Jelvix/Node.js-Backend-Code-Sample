const Sequelize = require('sequelize');

module.exports = db => {
  return db.define('club', {
    title: {
      type: Sequelize.STRING
    }
  }, {paranoid: true});
};
