const user = require('../components/user');
const tournament = require('../components/tournament');
const auth = require('../components/auth');
const clubs = require('../components/clubs');

module.exports = app => {
  const components = [auth, user, tournament, clubs];
  components.forEach(component => {
    component(app);
  });
};
