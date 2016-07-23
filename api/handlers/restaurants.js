const RestaurantsProvider = require ('../data-provider/restaurants');

module.exports.restaurants = {
  handler: function (request, reply) {
    RestaurantsProvider.getRestaurants(function(result) {
      return reply(result);
    })

  },
  description: 'Get nearest restaurants',
  tags: ['api']
}
