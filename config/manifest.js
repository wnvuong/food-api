const Pack = require('../package');
const secretProperties = require('../secretProperties');
const fs = require('fs');

module.exports = {
  connections: [
    {
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
    },
    {
      host: secretProperties.HOSTNAME,
      port: secretProperties.HTTP_PORT,
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      },
      labels: ["http"]
    }
  ],
  registrations: [
    {
      plugin: "hapi-auth-jwt2"
    },
    {
      plugin: "./auth"
    },
    // BEGIN Swagger Documentation
    {
      plugin: "inert"
    },
    {
      plugin: "vision"
    },
    {
      plugin: {
        register: "hapi-swagger",
        options: {
          info: {
            title: "noms API Documentation",
            version: Pack.version
          }
        }
      },
      options: {
        select: ["https"]
      }
    },
    // END Swagger Documentation
    {
      plugin: "./api",
      options: {
        select: ["https"],
        routes: {
          prefix: "/api"
        }
      }
    },
    {
      plugin: "./redirect",
      options: {
        select: ["http"]
      }
    },
    {
      plugin: {
        register: "blipp",
        options: {}
      }
    },
    {
      plugin: {
        register: "good",
        options: {
          ops: {
            interval: 60000
          },
          reporters: {
            console: [
              {
                module: "good-console",
                args: [
                  {
                    events: {
                      response: "*"
                    }
                  }
                ]
              },
              "stdout"
            ]
          }
        }
      }
    }
  ]
}
