const MongoInstance = require('./mongodb');
const Assert = require('assert');

const usersCollectionName = 'users';
const nomsListsCollectionName = 'noms-lists';

module.exports.getUsers = function(callback) {
  MongoInstance.checkDatabaseandServer();

  var usersCollection = MongoInstance.database.collection(usersCollectionName);

  usersCollection.find({}).toArray(function(err, docs) {

    Assert.equal(err, null);
    MongoInstance.server.log('Found the following records');
    MongoInstance.server.log(docs)
    callback({
      status: 'success',
      result: docs
    });

  });
}

module.exports.deleteUsers = function(callback) {
  MongoInstance.checkDatabaseandServer();

  var usersCollection = MongoInstance.database.collection(usersCollectionName);

  usersCollection.deleteMany({}, function(err, r) {
    Assert.equal(err, null);
    Assert.equal(r.result.ok, 1);

    callback({
      status: 'success',
      result: r.deletedCount
    });

  })
}

module.exports.getUser = function(userId, callback) {

  Assert.notEqual(userId, null);

  MongoInstance.checkDatabaseandServer();

  var usersCollection = MongoInstance.database.collection(usersCollectionName);
  usersCollection.aggregate([
    { $match: { _id: new MongoInstance.mongo.ObjectID(userId) } },
    { $lookup: {
      from: nomsListsCollectionName,
      localField: '_id',
      foreignField: 'ownerId',
      as: 'noms-lists'
    } }
  ], function(err, r) {
      Assert.equal(err, null);
      MongoInstance.server.log('Found the following document', r);
      callback({
        status: 'success',
        result: r
      });
  });

  // usersCollection.findOne({ '_id': new MongoInstance.mongo.ObjectID(userId) }, function(err, doc) {
  //
  //   Assert.equal(err, null);
  //   MongoInstance.server.log('Found the following document', doc);
  //   callback({
  //     status: 'success',
  //     results: doc
  //   });
  //
  // });
}

module.exports.addUser = function(user, callback) {

  Assert.notEqual(user, null);
  Assert.notEqual(user.firstName, null);
  Assert.notEqual(user.firstName, '');
  Assert.notEqual(user.lastName, null);
  Assert.notEqual(user.lastName, '');

  MongoInstance.checkDatabaseandServer();

  var usersCollection = MongoInstance.database.collection('users');

  usersCollection.insertOne(user, function(err, result) {
    Assert.equal(err, null);
    Assert.equal(1, result.insertedCount);

    callback({
      status: 'success',
      result: result.insertedId
    });
  });
}

module.exports.updateUser = function(updateInfo, callback) {

  MongoInstance.checkDatabaseandServer();

  var usersCollection = MongoInstance.database.collection('users');

  callback({
    status: 'failure',
    result: 'not yet implemented'
  })
}
