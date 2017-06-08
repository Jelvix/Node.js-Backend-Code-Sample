const user = require('../components/user');
const tournament = require('../components/tournament');
const auth = require('../components/auth');
const club = require('../components/club');

module.exports = app => {
  const components = [auth, user, tournament, club];
  components.forEach(component => {
    component(app);
  });
};
