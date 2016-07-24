const RestaurantsProvider = require ('../data-provider/restaurants');
const Joi = require('joi');

module.exports.restaurants = {
  handler: function (request, reply) {
    RestaurantsProvider.getRestaurants(function(result) {
      return reply(result);
    })

  },
  description: 'Get nearest restaurants',
  tags: ['api']
}

module.exports.restaurant = {
  handler: function (request, reply) {
    RestaurantsProvider.getRestaurant(request.params.restaurantId, function(result) {
      return reply(result);
    })
  },
  description: 'Get restaurant',
  tags: ['api'],
  validate: {
    params: {
      restaurantId: Joi.string().required().example('yelp-san-francisco')
    }
  }
}
