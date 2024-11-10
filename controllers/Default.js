'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.addAccommodation = function addAccommodation (req, res, next, body, userId, tripId) {
  Default.addAccommodation(body, userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addActivity = function addActivity (req, res, next, userId, tripId, dayId) {
  Default.addActivity(userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addDay = function addDay (req, res, next, userId, tripId) {
  Default.addDay(userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addTransportation = function addTransportation (req, res, next, body, userId, tripId) {
  Default.addTransportation(body, userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createTrip = function createTrip (req, res, next, body, userId) {
  Default.createTrip(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUser = function createUser (req, res, next, body) {
  Default.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteActivity = function deleteActivity (req, res, next, userId, tripId, dayId, activityId) {
  Default.deleteActivity(userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateRandomActivities = function generateRandomActivities (req, res, next, userId, tripId, dayId) {
  Default.generateRandomActivities(userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getActivity = function getActivity (req, res, next, userId, tripId, dayId, activityId) {
  Default.getActivity(userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDay = function getDay (req, res, next, userId, tripId, dayId) {
  Default.getDay(userId, tripId, dayId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTrip = function getTrip (req, res, next, userId, tripId) {
  Default.getTrip(userId, tripId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersTrips = function getUsersTrips (req, res, next, userId) {
  Default.getUsersTrips(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateActivity = function updateActivity (req, res, next, userId, tripId, dayId, activityId) {
  Default.updateActivity(userId, tripId, dayId, activityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
