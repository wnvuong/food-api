'use strict';

const MongoDB = require('./mongodb');
const Assert = require('assert');

const getItems = function(collection, callback) {
  MongoDB.getDocuments(collection, function(docs) {
    return callback(docs);
  });
}

const getUsers = function(callback) {
  MongoDB.getUsers(function(docs) {
    return callback(docs);
  })
}

const deleteUsers = function(callback) {
  MongoDB.deleteUsers(function(result) {
    return callback(result);
  })
}

const addUser = function(user, callback) {

  Assert.notEqual(user, null);
  Assert.notEqual(user.firstName, null);
  Assert.notEqual(user.lastName, null);

  MongoDB.addUser(user, function(result) {
    return callback(result);
  });
}

module.exports = {
  initDatabase: MongoDB.initialize,
  getItems: getItems,
  getUsers: getUsers,
  deleteUsers: deleteUsers,
  addUser: addUser
}
