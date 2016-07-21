'use strict';

const Mongo = require('mongodb')
const secretProperties = require('../../secretProperties')
const Assert = require('assert');

let server;
let database;

module.exports.mongo = Mongo;
module.exports.initialize = function(serverInput, callback) {
  module.exports.server = server = serverInput;

  Mongo.MongoClient.connect(secretProperties.MONGODB_URL, function(err, db) {
    module.exports.database = database = db;
    callback(err, db);
  });
}

module.exports.checkDatabaseandServer = function() {
  Assert.notEqual(database, null);
  Assert.notEqual(server, null);
}
