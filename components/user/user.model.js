const Sequelize = require('sequelize');

module.exports = db => {
  return db.define('user', {
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
};
