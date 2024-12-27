'use strict';

/**
 * Add an accommodation
 * Add a specific trip's accommodation
 *
 * body Accommodation The accommodation details needed for the object to be created
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Trip
 **/
exports.addAccommodation = function(body,userId,tripId) {
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
 * Add an activity
 * Adds a blank activity inside a certain day
 *
 * body Activity The activity details needed for the object to be created (optional)
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * returns Day
 **/
exports.addActivity = function(body,userId,tripId,dayId) {
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
 * Add a day
 * Adds a new day to the trip
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Trip
 **/
exports.addDay = function(userId,tripId) {
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
 * Add a transportation method
 * Add a transportation method to the trip
 *
 * body Transportation The transportation details needed for the object to be created
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Trip
 **/
exports.addTransportation = function(body,userId,tripId) {
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
 * Create a new trip
 * The user creates a new trip
 *
 * body Trip Parameters needed to create a new trip
 * userId Long The user's Id
 * returns Trip
 **/
exports.createTrip = function(body,userId) {
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
 * Create a new user
 * Creates a new user in the system with the specified information.
 *
 * body User The user details needed for the object to be created
 * returns User
 **/
exports.createUser = function(body) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
    "id" : 1,
    "name" : "John Doe",
    "email" : "john.doe@example.com",
    "password" : "secret123"
    };
        if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
        } else {
        resolve();
        }
    });
}