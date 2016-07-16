'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const manifest = require('./config/manifest.json');
const fs = require('fs');

if (process.env.PORT) {
  manifest.connections[0].port = process.env.PORT;
}

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
  // https://certsimple.com/blog/localhost-ssl-fix
  manifest.connections[0].tls = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  };
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
  });
})
