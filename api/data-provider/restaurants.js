var Yelp = require('yelp');
const secretProperties = require('../../secretProperties');

var yelp = new Yelp({
  consumer_key: secretProperties.YELP_CONSUMER_KEY,
  consumer_secret: secretProperties.YELP_CONSUMER_SECRET,
  token: secretProperties.YELP_TOKEN,
  token_secret: secretProperties.YELP_TOKEN_SECRET
});

module.exports.getRestaurants = function(callback) {

  const options = {
    category_filter: 'restaurants',
    location: 'richmond, va'
  };

  yelp.search(options)
  .then(function(data) {

    var restaurants = data.businesses.map(function(orig, index) {

      var simplified = {};

      simplified.id = orig.id;
      simplified.name = orig.name;
      simplified.rating = orig.rating;
      simplified.coordinate = orig.location.coordinate;

      return simplified;
    });

    callback({
      status: 'success',
      result: restaurants
    });
  })
  .catch(function(err) {

    callback({
      status: 'failure',
      result: err
    });
  })
}
