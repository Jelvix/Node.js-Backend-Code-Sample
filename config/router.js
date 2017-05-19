const user = require('../components/user');
const tournament = require('../components/tournament');

module.exports = app => {
  const components = [user, tournament];
  components.forEach(component => {
    component(app);
  })
};
