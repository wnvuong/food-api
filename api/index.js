const Home = require('./handlers/home');
const Restaurants = require('./handlers/restaurants');
const Users = require('./handlers/users');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'GET', path: '/restaurants', config: Restaurants.restaurants },
    { method: 'GET', path: '/users', config: Users.users },
    { method: 'DELETE', path: '/users/{password}', config: Users.deleteUsers },
    { method: 'POST', path: '/users', config: Users.addUser }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
