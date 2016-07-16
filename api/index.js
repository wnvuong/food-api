const Home = require('./handlers/home');
const DataProvider = require('./handlers/dataprovider');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'GET', path: '/data/restaurants', config: DataProvider.restaurants }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
