'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const manifest = require('./config/manifest.json');
const fs = require('fs');

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
} else {
  manifest.connections[0].host = undefined;
  manifest.connections[0].port = 443;
  manifest.connections[0].tls = {
    key: fs.readFileSync('/root/letsencrypt/etc/live/api.getnoms.com/privkey.pem'),
    cert: fs.readFileSync('/root/letsencrypt/etc/live/api.getnoms.com/cert.pem')
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
