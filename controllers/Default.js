'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Handles adding accommodation to a trip for a user
module.exports.addAccommodation = function addAccommodation(req, res, next, { body, userId, tripId }) {
  Default.addAccommodation(body, userId, tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding an activity to a specific day of a trip
module.exports.addActivity = function addActivity(req, res, next, { body, userId, tripId, dayId }) {
  Default.addActivity(body, userId, tripId, dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding a new day to a trip for a user
module.exports.addDay = function addDay(req, res, next, { userId, tripId }) {
  Default.addDay(userId, tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles adding transportation details to a trip
module.exports.addTransportation = function addTransportation(req, res, next, { body, userId, tripId }) {
  Default.addTransportation(body, userId, tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles creating a new trip for a user
module.exports.createTrip = function createTrip(req, res, next, { body, userId }) {
  Default.createTrip(body, userId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles creating a new user
module.exports.createUser = function createUser(req, res, next, { body }) {
  Default.createUser(body)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles deleting an activity from a specific day in a trip
module.exports.deleteActivity = function deleteActivity(req, res, next, { userId, tripId, dayId, activityId }) {
  Default.deleteActivity(userId, tripId, dayId, activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles generating random activities for a specific day in a trip
module.exports.generateRandomActivities = function generateRandomActivities(req, res, next, { userId, tripId, dayId }) {
  Default.generateRandomActivities(userId, tripId, dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving a specific activity from a day in a trip
module.exports.getActivity = function getActivity(req, res, next, { userId, tripId, dayId, activityId }) {
  Default.getActivity(userId, tripId, dayId, activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving the details of a specific day in a trip
module.exports.getDay = function getDay(req, res, next, { userId, tripId, dayId }) {
  Default.getDay(userId, tripId, dayId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving the details of a specific trip for a user
module.exports.getTrip = function getTrip(req, res, next, { userId, tripId }) {
  Default.getTrip(userId, tripId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles retrieving all trips for a specific user
module.exports.getUsersTrips = function getUsersTrips(req, res, next, { userId }) {
  Default.getUsersTrips(userId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};

// Handles updating an activity in a specific day of a trip
module.exports.updateActivity = function updateActivity(req, res, next, { body, userId, tripId, dayId, activityId }) {
  Default.updateActivity(body, userId, tripId, dayId, activityId)
    .then(response => utils.writeJson(res, response))
    .catch(response => utils.writeJson(res, response));
};
