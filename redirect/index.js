const secretProperties = require('../secretProperties');

exports.register = (plugin, options, next) => {

  const redirect = function (request, reply) {
    var params = null;
    if (request.params.path != null) {
      params = '/' + request.params.path;
    }
    return reply.redirect('https://' + request.info.hostname + ':' + secretProperties.HTTPS_PORT + (params != null ? params : ''));
  };

  plugin.route([
    { method: '*', path: '/{path*}', handler: redirect },
  ]);

  next();
};

exports.register.attributes = {
  name: 'redirect'
};
