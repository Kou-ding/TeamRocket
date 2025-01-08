'use strict';

/**
 * Put an activity
 * Updates an activity inside a certain day
 *
 * body Activity The activity details needed for the object to be created (optional)
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * activityId Long The activity's Id
 * returns Day
 **/
exports.updateActivity = function(body,userId,tripId,dayId,activityId) {
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