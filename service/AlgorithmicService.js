'use strict';

/**
 * Generate activities
 * Generates some random activities to fill the day with
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * returns Day
 **/
exports.generateRandomActivities = function(userId,tripId,dayId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "id" : 1,
    "dayNumber" : 1,
    "activityList" : [ {
      "name" : "Snorkeling",
      "description" : "Explore the coral reefs.",
      "lockedStatus" : false
    }, {
      "name" : "Dinner by the beach",
      "description" : "Enjoy a candlelight dinner.",
      "lockedStatus" : true
    } ]
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }
  