'use strict';

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