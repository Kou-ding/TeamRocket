'use strict';
  
/**
 * Get an activity
 * Retrieves a specific activity inside a certain day
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * activityId Long The activity's Id
 * returns Activity
 **/
exports.getActivity = function(userId,tripId,dayId,activityId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "name" : "Snorkeling",
    "description" : "Explore the coral reefs.",
    "lockedStatus" : false
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }
  
  /**
   * Get day
   * Returns a specific day
   *
   * userId Long The user's Id
   * tripId Long The trip's Id
   * dayId Long The day's Id
   * returns Day
   **/
  exports.getDay = function(userId,tripId,dayId) {
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
  
  /**
   * Get a specific trip
   * Returns a specific trip
   *
   * userId Long The user's Id
   * tripId Long The trip's Id
   * returns Trip
   **/
  exports.getTrip = function(userId,tripId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "id" : 101,
    "name" : "Beach Vacation",
    "destination" : "Maldives",
    "dates" : ["2024-12-20", "2024-12-27"],
    "budget" : 5000,
    "isPast" : false,
    "accommodation" : {
      "name" : "Paradise Inn",
      "address" : "123 Beach Road, Maldives",
      "price" : 1500
    },
    "transportation" : {
      "name" : "Flight",
      "date" : "2024-12-20",
      "time" : 930
    },
    "daysList" : [ {
      "dayNumber" : 1,
      "id" : 1,
      "activityList" : [ {
        "name" : "Snorkeling",
        "description" : "Explore the coral reefs.",
        "lockedStatus" : false
      } ]
    } ]
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }
  
  /**
   * Get a user's trips
   * Returns the trips that are under a specific user
   *
   * userId Long The user's Id
   * returns List
   **/
  exports.getUsersTrips = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ {
    "id" : 101,
    "name" : "Beach Vacation",
    "destination" : "Maldives",
    "dates" : ["2024-12-20", "2024-12-27"],
    "budget" : 5000,
    "isPast" : false,
    "accommodation" : {
      "name" : "Paradise Inn",
      "address" : "123 Beach Road, Maldives",
      "price" : 1500
    },
    "transportation" : {
      "name" : "Flight",
      "date" : "2024-12-20",
      "time" : 930
    },
    "daysList" : [ {
      "dayNumber" : 1,
      "id" : 1,
      "activityList" : [ {
        "name" : "Snorkeling",
        "description" : "Explore the coral reefs.",
        "lockedStatus" : false
      } ]
    } ]
  }, {
    "id" : 101,
    "name" : "Beach Vacation",
    "destination" : "Maldives",
    "dates" : ["2024-12-20", "2024-12-27"],
    "budget" : 5000,
    "isPast" : false,
    "accommodation" : {
      "name" : "Paradise Inn",
      "address" : "123 Beach Road, Maldives",
      "price" : 1500
    },
    "transportation" : {
      "name" : "Flight",
      "date" : "2024-12-20",
      "time" : 930
    },
    "daysList" : [ {
      "dayNumber" : 1,
      "id" : 1,
      "activityList" : [ {
        "name" : "Snorkeling",
        "description" : "Explore the coral reefs.",
        "lockedStatus" : false
      } ]
    } ]
  } ];
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }