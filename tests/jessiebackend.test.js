// filepath: /home/kou/Documents/TeamRocket/tests/jessiebackend.test.js
const test = require("ava");
const test_init = require("../test_init");

// Initialize the test environment
test_init();


    

// Tests for GET user/{userId}/trip{tripID}/day/{dayId}

test('GET ../{dayId} Happy path: Valid userId, tripId, and dayId', async (t) => {
  const userId = 1; // Replace with a valid userId
  const tripId = 101; // Replace with a valid tripId
  const dayId = 5; // Replace with a valid dayId

  try {
    const response = await t.context.got.get(`user/${userId}/trip/${tripId}/day/${dayId}`);
    t.is(response.statusCode, 200, 'Expected a 200 status code for a successful GET request');
    // Additional checks for response content can be added here if needed.
  } catch (error) {
    t.fail(`Request failed: ${error.message}`);
  }
});

/*

NEED TO FIND HOW TO CHECK FOR NEGATIVE ID



test('Unhappy path: Negative dayId', async (t) => {
  const userId = 1;
  const tripId = 101;
  const negativeDayId = -5;

  try {
    const response = await got.get(`http://localhost:8080/user/${userId}/trip/${tripId}/day/${negativeDayId}`);
    t.fail('Expected a 400 status code response, but the request was successful');
  } catch (error) {
    t.is(error.response.statusCode, 400, 'Expected status code 400 for negative dayId');
    const errorBody = JSON.parse(error.response.body);
    t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
  }
});

*/

test('GET ../{dayId}: Unhappy path: dayId as a string', async (t) => {
    const userId = 1
    const tripId = 1
    const invalidDayId = "invalidString";

    try {
      const response = await t.context.got.get(`user/${userId}/trip/${tripId}/day/${invalidDayId}`);
      t.fail('Expected a 400 status code response, but the request was successful');
    } catch (error) {
      if (error.response) {
        t.is(error.response.statusCode, 400, 'Expected status code 400 for invalid dayId type');
        const errorBody = typeof error.response.body === 'string'
            ? JSON.parse(error.response.body)
            :error.response.body;
        t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
        //t.regex(errorBody.message, /dayId should be integer/, 'Expected error message to mention invalid dayId');
        t.is(errorBody.message, 'request.params.dayId should be integer', 'Error message should indicate invalid dayId type');
      } else {
        t.fail(`Unexpected error: ${error.message}`);
      }
    }
});


    
// Test DELETE on /day/{dayId}
test('DELETE ../{dayid}: Unhappy path: DELETE request on the GET endpoint', async (t) => {
  const userId = 1;
  const tripId = 101;
  const dayId = 5;

  try {
    const response = await t.context.got.delete(`user/${userId}/trip/${tripId}/day/${dayId}`);
    t.fail('Expected a 405 status code response, but the request was successful');
  } catch (error) {
    t.is(error.response.statusCode, 405, 'Expected status code 405 for unsupported DELETE request');
  }
});

// Tests for POST user/{userID}/trip/{tripId}/activity
// Happy path: POST suceesful
test('POST ../activity: Happy path: Create activity', async (t) => {
    const userId = 1; // Valid userId
    const tripId = 101; // Valid tripId
    const dayId = 5; // Valid dayId
    const activityData = {
      name: "Hiking",
      description: "A scenic mountain hike.",
      lockedStatus: false,
    };
  
    try {
      const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day/${dayId}/activity`, {
        json: activityData, // Send the body as JSON
        responseType: 'json', // Automatically parse JSON response
      });
  
      // Assertions for success
      t.is(response.statusCode, 200, 'Expected status code 200 for successful creation');
      t.truthy(response.body, 'Response body should exist');
    } catch (error) {
      t.fail(`Unexpected error: ${error.message}`);
    }
  });

//Unhappy path: no body
test('POST ../activity: Unhappy path: Missing request body', async (t) => {
    const userId = 1; // Valid userId
    const tripId = 101; // Valid tripId
    const dayId = 5; // Valid dayId
  
    try {
      await t.context.got.post(`user/${userId}/trip/${tripId}/day/${dayId}/activity`, {
        json: undefined, // No body sent
      });
      t.fail('Expected a 400 status code response due to missing body, but the request was successful');
    } catch (error) {
      if (error.response) {
        // Assertions for validation failure
        t.is(error.response.statusCode, 415, 'Expected status code 415 for missing body');
        const errorBody = typeof error.response.body === 'string'
            ? JSON.parse(error.response.body)
            :error.response.body;
        t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
        //t.regex(errorBody.message, /body is required/i, 'Expected error message to mention missing body');
      } else {
        t.fail(`Unexpected error: ${error.message}`);
      }
    }
  });
  
  