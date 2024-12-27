/**
 * @file Default.js
 * @description This file contains the controller functions for the API endpoints.
 * Each function corresponds to an endpoint and interacts with the DefaultService to perform the required operations.
 * The responses are written using the utils.writeJson method.
 */

'use strict';

var utils = require('../utils/writer.js');
var GetService = require('../service/GetService');
var PostService = require('../service/PostService');
var AddService = require('../service/AddService');
var PutService = require('../service/PutService');
var DeleteService = require('../service/DeleteService');
var AlgorithmicService = require('../service/AlgorithmicService');


// Add accommodation to a trip
module.exports.addAccommodation = function addAccommodation (req, res, next, body, userId, tripId) {
  AddService.addAccommodation(body, userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Add activity to a day
module.exports.addActivity = function addActivity (req, res, next, body, userId, tripId, dayId) {
  AddService.addActivity(body, userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Add day to a trip
module.exports.addDay = function addDay (req, res, next, userId, tripId) {
  AddService.addDay(userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Add transportation to a trip
module.exports.addTransportation = function addTransportation (req, res, next, body, userId, tripId) {
  AddService.addTransportation(body, userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Create a new trip
module.exports.createTrip = function createTrip (req, res, next, body, userId) {
  PostService.createTrip(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Create a new user
module.exports.createUser = function createUser (req, res, next, body) {
  PostService.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Delete an activity
module.exports.deleteActivity = function deleteActivity (req, res, next, userId, tripId, dayId, activityId) {
  DeleteService.deleteActivity(userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Generate random activities for a certain day
module.exports.generateRandomActivities = function generateRandomActivities (req, res, next, userId, tripId, dayId) {
  AlgorithmicService.generateRandomActivities(userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Get an activity
module.exports.getActivity = function getActivity (req, res, next, userId, tripId, dayId, activityId) {
  GetService.getActivity(userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Get a day
module.exports.getDay = function getDay (req, res, next, userId, tripId, dayId) {
  GetService.getDay(userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Get a trip
module.exports.getTrip = function getTrip (req, res, next, userId, tripId) {
  GetService.getTrip(userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Get all trips of a user
module.exports.getUsersTrips = function getUsersTrips (req, res, next, userId) {
  GetService.getUsersTrips(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Update an activity
module.exports.updateActivity = function updateActivity (req, res, next, body, userId, tripId, dayId, activityId) {
  PutService.updateActivity(body, userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
