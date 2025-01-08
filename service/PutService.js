'use strict';

/**
 * Put an activity
 * Updates an activity inside a certain day
 *
 * @param {Object} params - Object containing the necessary parameters
 * @param {Object} params.body - The activity details needed for the object to be created (optional)
 * @param {number} params.userId - The user's ID
 * @param {number} params.tripId - The trip's ID
 * @param {number} params.dayId - The day's ID
 * @param {number} params.activityId - The activity's ID
 * @returns {Promise<Object>} - A promise resolving to the updated day's details
 **/
exports.updateActivity = function (params) {
  return new Promise(function (resolve, reject) {
    // Example response to simulate the API's behavior
    var examples = {};
    examples['application/json'] = {
      id: 1, // The ID of the day being updated
      dayNumber: 1, // The number of the day in the trip
      activityList: [
        {
          name: "Snorkeling", // Name of the activity
          description: "Explore the coral reefs.", // Description of the activity
          lockedStatus: false, // Indicates if the activity is locked
        },
        {
          name: "Dinner by the beach",
          description: "Enjoy a candlelight dinner.",
          lockedStatus: true,
        },
      ],
    };

    // Simulating API success by resolving the first example in the list
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      // Resolve with no data if no examples are available
      resolve();
    }
  });
};

  
  
