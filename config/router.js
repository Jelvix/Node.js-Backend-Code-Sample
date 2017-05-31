const user = require('../components/user');
const tournament = require('../components/tournament');
const auth = require('../components/auth');

module.exports = app => {
  const components = [auth, user, tournament];
  components.forEach(component => {
    component(app);
  });
};
