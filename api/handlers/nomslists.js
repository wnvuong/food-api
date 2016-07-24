'use strict';

const NomsListsProvider = require('../data-provider/nomslists');
const Joi = require('joi');

module.exports.lists = {
  handler: function (request, reply) {
    NomsListsProvider.getLists(function(result) {
      return reply(result);
    })
  },
  description: 'Get all lists',
  tags: ['api']
}

module.exports.getList = {
  handler: function (request, reply) {
    NomsListsProvider.getList(request.params.listId, function(result) {
      return reply(result);
    })
  },
  description: 'Get a list',
  tags: ['api'],
  validate: {
    params: {
      listId: Joi.string().required().example('578ee876f58f94bb9ec01be5')
    }
  }
}

module.exports.addList = {
  handler: function (request, reply) {
    NomsListsProvider.addList(request.payload, function(result) {
      return reply(result);
    })
  },
  description: 'Add a list',
  tags: ['api'],
  validate: {
    payload: {
      ownerId: Joi.string().required().example('578ec712b5580bb8993d2492'),
      name: Joi.string().required().example('New York City')
    }
  }
}

module.exports.updateList = {
  handler: function (request, reply) {
    NomsListsProvider.updateList({
      listId: request.params.listId,
      name: request.payload.name,
      add: request.payload.add,
      remove: request.payload.remove
    }, function(result) {
      return reply(result);
    })
  },
  description: 'Update a list',
  tags: ['api'],
  validate: {
    params: {
      listId: Joi.string().required().example('578ee876f58f94bb9ec01be5')
    },
    payload: {
      name: Joi.string().invalid('').example('New York City'),
      add: Joi.array().items(Joi.object({
        yelpId: Joi.string().example('1a2s3d4f').required()
      })).min(1),
      remove: Joi.array().items(Joi.object({
        yelpId: Joi.string().example('1a2s3d4f').required()
      })).min(1)
    }
  }
}
