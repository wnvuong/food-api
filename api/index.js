const Home = require('./handlers/home');
const Restaurants = require('./handlers/restaurants');
const Users = require('./handlers/users');
const NomsLists = require('./handlers/nomslists');

exports.register = (plugin, options, next) => {

  plugin.route([

    // GENERAL
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },

    // RESTAURANTS
    { method: 'GET', path: '/restaurants', config: Restaurants.restaurants },

    // USERS
    { method: 'GET', path: '/users', config: Users.users },
    { method: 'GET', path: '/user/{userId}', config: Users.getUser },
    { method: 'PUT', path: '/user/{userId}', config: Users.updateUser },
    { method: 'DELETE', path: '/users/{password}', config: Users.deleteUsers },
    { method: 'POST', path: '/users', config: Users.addUser },

    // NOMS LISTS
    { method: 'GET', path: '/nomslists', config: NomsLists.lists },
    { method: 'POST', path: '/nomslists', config: NomsLists.addList },
    { method: 'PUT', path: '/nomslists/{listId}', config: NomsLists.updateList }

  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
