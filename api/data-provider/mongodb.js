'use strict';

const MongoClient = require('mongodb').MongoClient
const secretProperties = require('../../secretProperties')
const Assert = require('assert');

let server;
let database;

const initialize = function(serverInput, callback) {

  server = serverInput;

  MongoClient.connect(secretProperties.MONGODB_URL, function(err, db) {
    database = db;
    callback(err, db);
  });
}

const getDocuments = function(collectionInput, callback) {
  checkDatabaseandServer();

  var collection = database.collection(collectionInput);

  collection.find({}).toArray(function(err, docs) {

    Assert.equal(err, null);
    server.log("Found the following records");
    server.log(docs)
    callback(docs);

  });
}

const getUsers = function(callback) {
  checkDatabaseandServer();

  var usersCollection = database.collection('users');

  usersCollection.find({}).toArray(function(err, docs) {

    Assert.equal(err, null);
    server.log("Found the following records");
    server.log(docs)
    callback(docs);

  });
}

const deleteUsers = function(callback) {
  checkDatabaseandServer();

  var usersCollection = database.collection('users');

  usersCollection.deleteMany({}, function(err, r) {
    Assert.equal(err, null);
    Assert.equal(r.result.ok, 1);

    callback({
      status: 'success',
      deletedCount: r.deletedCount
    });

  })
}

const getUser = function(callback) {
  checkDatabaseandServer();

  var usersCollection = database.collection('users');

  usersCollection.find({}).toArray(function(err, docs) {

    Assert.equal(err, null);
    server.log("Found the following records");
    server.log(docs)
    callback(docs);

  });
}

const addUser = function(user, callback) {
  Assert.notEqual(user, null);
  Assert.notEqual(user.firstName, null);
  Assert.notEqual(user.firstName, '');
  Assert.notEqual(user.lastName, null);
  Assert.notEqual(user.lastName, '');

  var usersCollection = database.collection('users');

  usersCollection.insertOne(user, function(err, result) {
    Assert.equal(err, null);
    Assert.equal(1, result.insertedCount);

    callback({
      status: 'success',
      insertedId: result.insertedId
    });
  });
}


const checkDatabaseandServer = function() {
  Assert.notEqual(database, null);
  Assert.notEqual(server, null);
}

module.exports = {
  initialize: initialize,
  getDocuments: getDocuments,
  getUsers: getUsers,
  deleteUsers: deleteUsers,
  getUser: getUser,
  addUser: addUser
}
