var Yelp = require('yelp');

console.log()
var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

module.exports.restaurants = {
  handler: function (request, reply) {
    yelp.search({ category_filter: 'restaurants', location: 'richmond, va' })
    .then(function(data) {
      return reply({ results: data });
    })
    .catch(function(err) {
      return reply({ results: data });
    })
  }
}
