const MongoInstance = require('./mongodb');
const Assert = require('assert');

const nomsListCollectionName = 'noms-lists';

module.exports.getLists = function(callback) {

  MongoInstance.checkDatabaseandServer();

  const nomsListsCollection = MongoInstance.database.collection(nomsListCollectionName);

  nomsListsCollection.find({}).toArray(function(err, docs) {

    Assert.equal(err, null);
    MongoInstance.server.log('Found the following records', docs);

    callback({
      status: 'success',
      results: docs
    });

  });
}

module.exports.addList = function(listData, callback) {

  MongoInstance.checkDatabaseandServer();

  const nomsListsCollection = MongoInstance.database.collection(nomsListCollectionName);

  nomsListsCollection.insertOne({
    ownerId: new MongoInstance.mongo.ObjectID(listData.ownerId),
    name: listData.name
  }, function(err, result) {

    Assert.equal(err, null);

    callback({
      status: 'success',
      insertedId: result.insertedId
    });
  });
}

module.exports.updateList = function(listData, callback) {

  MongoInstance.checkDatabaseandServer();

  const nomsListsCollection = MongoInstance.database.collection(nomsListCollectionName);

  const modifications = {};

  const remove = function() {
    nomsListsCollection.updateOne(
      {
        '_id': new MongoInstance.mongo.ObjectID(listData.listId)
      },
      { '$pullAll' : { 'restaurants': listData.remove } },
      function(err, r) {

        Assert.equal(err, null);

        callback({
          status: 'success',
          result: r
        });
      }
    );
  }

  if (listData.name != null && listData.name != '') {
    modifications['$set'] = { 'name': listData.name };
  }

  if (listData.add != null && listData.add.length > 0) {
    modifications['$addToSet'] = {
      'restaurants' : {
        $each: listData.add
      }
    }

    nomsListsCollection.updateOne(
      {
        '_id': new MongoInstance.mongo.ObjectID(listData.listId)
      },
      modifications,
      function(err, r) {

        Assert.equal(err, null);

        if (listData.remove != null && listData.remove.length > 0) {
          return remove();
        } else {
          return callback({
            status: 'success',
            result: r
          });
        }
      }
    );
  } else if (listData.remove != null && listData.remove.length > 0) {
    return remove();
  }
}
