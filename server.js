'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const Manifest = require('./config/manifest');
const fs = require('fs');
const initDatabase = require('./api/data-provider').initDatabase;

if (process.env.PRODUCTION) {
  // specify which connection tag our routes should attach to
  routes.options.select = ["https"];

  // we want http to redirect to https in production
  Manifest.registrations.push({
    plugin: "./redirect",
    options: {
      select: ["http"]
    }
  });

  // add the https connection
  Manifest.connections.push({
    host: secretProperties.HOSTNAME,
    port: secretProperties.HTTPS_PORT,
    routes: {
      cors: true
    },
    router: {
      stripTrailingSlash: true
    },
    labels: ["https"],
    tls: {
      key: fs.readFileSync(secretProperties.SSL_KEY_PATH),
      cert: fs.readFileSync(secretProperties.SSL_CERT_PATH)
    }
  });
}

Glue.compose(Manifest, { relativeTo: __dirname }, (err, server) => {

  if (err) {
    console.log('server.register err:', err);
  }

  initDatabase(server, function(err, db) {

    if (err) {
      console.log('initDatabase err', err);
    }

    server.start((err) => {

      if (err) {
        console.log('server.start err:', err);
      }

      server.connections.forEach(function(srv, index) {
        console.log('✅  Server is listening on ' + srv.info.uri.toLowerCase());
      });
    });
  });
});
