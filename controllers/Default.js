'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Handles adding accommodation to a trip for a user
module.exports.addAccommodation = function addAccommodation(req, res, next, params) {
  Default.addAccommodation(params.body, params.userId, params.tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding an activity to a specific day of a trip
module.exports.addActivity = function addActivity(req, res, next, params) {
  Default.addActivity(params.body, params.userId, params.tripId, params.dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding a new day to a trip for a user
module.exports.addDay = function addDay(req, res, next, params) {
  Default.addDay(params.userId, params.tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding transportation details to a trip
module.exports.addTransportation = function addTransportation(req, res, next, params) {
  Default.addTransportation(params.body, params.userId, params.tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles creating a new trip for a user
module.exports.createTrip = function createTrip(req, res, next, params) {
  Default.createTrip(params.body, params.userId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles creating a new user
module.exports.createUser = function createUser(req, res, next, params) {
  Default.createUser(params.body)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles deleting an activity from a specific day in a trip
module.exports.deleteActivity = function deleteActivity(req, res, next, params) {
  Default.deleteActivity(params.userId, params.tripId, params.dayId, params.activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles generating random activities for a specific day in a trip
module.exports.generateRandomActivities = function generateRandomActivities(req, res, next, params) {
  Default.generateRandomActivities(params.userId, params.tripId, params.dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving a specific activity from a day in a trip
module.exports.getActivity = function getActivity(req, res, next, params) {
  Default.getActivity(params.userId, params.tripId, params.dayId, params.activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving the details of a specific day in a trip
module.exports.getDay = function getDay(req, res, next, params) {
  Default.getDay(params.userId, params.tripId, params.dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving the details of a specific trip for a user
module.exports.getTrip = function getTrip(req, res, next, params) {
  Default.getTrip(params.userId, params.tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving all trips for a specific user
module.exports.getUsersTrips = function getUsersTrips(req, res, next, params) {
  Default.getUsersTrips(params.userId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles updating an activity in a specific day of a trip
module.exports.updateActivity = function updateActivity(req, res, next, params) {
  Default.updateActivity(params.body, params.userId, params.tripId, params.dayId, params.activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};
