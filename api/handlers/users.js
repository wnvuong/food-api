'use strict';

const DataProvider = require('../data-provider');
const Assert = require('assert');
const Joi = require('joi');

module.exports.users = {
  handler: function (request, reply) {
    DataProvider.getUsers(function(docs) {
      reply(docs);
    })
  },
  description: 'Get all users. TO BE REMOVED',
  tags: ['api']
}

module.exports.deleteUsers = {
  handler: function(request, reply) {
    if (request.params.password == 'williamvuong') {
      DataProvider.deleteUsers(function(result) {
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

    const user = request.payload;

    DataProvider.addUser(user, function(result) {
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
