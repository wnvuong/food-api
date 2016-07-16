'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const manifest = require('./config/manifest.json');

// https://certsimple.com/blog/localhost-ssl-fix
const fs = require('fs');
const options = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH)
}

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
  manifest.connections[0].tls = options;
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
  });
})
