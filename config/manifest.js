const Pack = require('../package');
const secretProperties = require('../secretProperties');

var swaggerAttachTag = "http";
var routesAttachTag = "http";
if (process.env.PRODUCTION) {
  swaggerAttachTag = "https";
  routesAttachTag = "https";
}

module.exports = {
  connections: [
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
          },
          basePath: '/api',
          tags: [{
            name: 'users',
            description: 'Users data'
          }, {
            name: 'restaurants',
            description: 'Restaurants data'
          }, {
            name: 'nomslists',
            description: 'Users nomslists'
          }],
          pathPrefixSize: 2
        }
      },
      options: {
        select: [swaggerAttachTag]
      }
    },
    // END Swagger Documentation
    // BEGIN Routes
    {
      plugin: "./api",
      options: {
        select: [routesAttachTag],
        routes: {
          prefix: "/api"
        }
      }
    },
    // END Routes
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
