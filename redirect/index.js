exports.register = (plugin, options, next) => {

  const redirect = function (request, reply) {
    return reply.redirect('https://' + request.info.host + '/' + request.params.path);
  };

  plugin.route([
    { method: '*', path: '/{path*}', handler: redirect },
  ]);

  next();
};

exports.register.attributes = {
  name: 'redirect'
};
