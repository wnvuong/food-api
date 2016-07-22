'use strict';

const UsersProvider = require('../data-provider/users');
const Joi = require('joi');

module.exports.users = {
  handler: function (request, reply) {
    UsersProvider.getUsers(function(result) {
      reply(result);
    })
  },
  description: 'Get all users. TO BE REMOVED',
  tags: ['api']
}

module.exports.getUser = {
  handler: function (request, reply) {
    UsersProvider.getUser(request.params.userId, function(result) {
      reply(result);
    })
  },
  description: 'Get specific user by ID',
  tags: ['api'],
  validate: {
    params: {
      userId: Joi.string().required().default('578ec712b5580bb8993d2492')
    }
  }
}

module.exports.updateUser = {
  handler: function (request, reply) {
    UsersProvider.updateUser({
      userId: request.params.userId,
      lists: request.payload.lists
    }, function(result) {
      reply(result);
    });
  },
  description: 'Update user',
  tags: ['api'],
  validate: {
    params: {
      userId: Joi.string().required().default('578ec712b5580bb8993d2492')
    },
    payload: {
      lists: Joi.array().items(Joi.object({
        name: Joi.string().example('New York City').required(),
        items: Joi.array().items(Joi.object({
          id: Joi.string().example('1a2s3d4f').required(),
          operation: Joi.string().valid(['add', 'remove']).required()
        })).min(1).required()
      })).min(1).required()
    }
  }
}

module.exports.deleteUsers = {
  handler: function(request, reply) {
    if (request.params.password == 'williamvuong') {
      UsersProvider.deleteUsers(function(result) {
        reply(result);
      })
    } else {
      reply({
        status: 'failure',
        message: 'Incorrect password'
      })
    }
  },
  description: 'Remove all users. TO BE REMOVED',
  tags: ['api'],
  validate: {
    params: {
      password: Joi.string().required()
    }
  }
}

module.exports.addUser = {
  handler: function (request, reply) {
    UsersProvider.addUser(request.payload, function(result) {
      reply(result);
    });
  },
  description: 'Add a user',
  tags: ['api'],
  validate: {
    payload: Joi.object({
      firstName: Joi.string().required().default('Willy'),
      lastName: Joi.string().required().default('Prosciutto')
    })
  }
}
