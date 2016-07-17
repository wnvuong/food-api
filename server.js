'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const Manifest = require('./config/manifest');

Glue.compose(Manifest, { relativeTo: __dirname }, (err, server) => {

  if (err) {
    console.log('server.register err:', err);
  }

  server.start((err) => {

    if (err) {
      console.log('server.start err:', err);
    }

    server.connections.forEach(function(srv, index) {
      console.log('✅  Server is listening on ' + srv.info.uri.toLowerCase());
    });

  });
})
