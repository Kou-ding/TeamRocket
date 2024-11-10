'use strict';


/**
 * Add an accommodation
 * Add a specific trip's accommodation
 *
 * body Trip The accommodation details needed for the object to be created
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Accommodation
 **/
exports.addAccommodation = function(body,userId,tripId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "price" : 0,
  "name" : "name"
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
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * returns Day
 **/
exports.addActivity = function(userId,tripId,dayId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "dayNumber" : 6,
  "id" : 0,
  "activityList" : [ { }, { } ]
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
 * Adds an new day to the trip
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Trip
 **/
exports.addDay = function(userId,tripId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "daysList" : [ 1, 1 ],
  "name" : "name",
  "destination" : "destination",
  "accommodation" : { },
  "days" : { },
  "dates" : "dates",
  "id" : 0,
  "isPast" : true,
  "budget" : 6,
  "transportation" : { }
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
 * body Trip The transportation details needed for the object to be created
 * userId Long The user's Id
 * tripId Long The trip's Id
 * returns Transportation
 **/
exports.addTransportation = function(body,userId,tripId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "date",
  "name" : "name",
  "time" : 0
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
 * userId User The user's Id
 * returns Trip
 **/
exports.createTrip = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "daysList" : [ 1, 1 ],
  "name" : "name",
  "destination" : "destination",
  "accommodation" : { },
  "days" : { },
  "dates" : "dates",
  "id" : 0,
  "isPast" : true,
  "budget" : 6,
  "transportation" : { }
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
  "password" : "password",
  "name" : "name",
  "id" : 0,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete an activity
 * Deletes an activity inside a certain day
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * activityId Long The activity's Id
 * returns Day
 **/
exports.deleteActivity = function(userId,tripId,dayId,activityId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "dayNumber" : 6,
  "id" : 0,
  "activityList" : [ { }, { } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
  "dayNumber" : 6,
  "id" : 0,
  "activityList" : [ { }, { } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
  "name" : "name",
  "lockedStatus" : true,
  "description" : "description"
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
  "dayNumber" : 6,
  "id" : 0,
  "activityList" : [ { }, { } ]
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
  "daysList" : [ 1, 1 ],
  "name" : "name",
  "destination" : "destination",
  "accommodation" : { },
  "days" : { },
  "dates" : "dates",
  "id" : 0,
  "isPast" : true,
  "budget" : 6,
  "transportation" : { }
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
 * userId User The user's Id
 * returns Trip
 **/
exports.getUsersTrips = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "daysList" : [ 1, 1 ],
  "name" : "name",
  "destination" : "destination",
  "accommodation" : { },
  "days" : { },
  "dates" : "dates",
  "id" : 0,
  "isPast" : true,
  "budget" : 6,
  "transportation" : { }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Put an activity
 * Updates an activity inside a certain day
 *
 * userId Long The user's Id
 * tripId Long The trip's Id
 * dayId Long The day's Id
 * activityId Long The activity's Id
 * returns Day
 **/
exports.updateActivity = function(userId,tripId,dayId,activityId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "dayNumber" : 6,
  "id" : 0,
  "activityList" : [ { }, { } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

