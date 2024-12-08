const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");


const HTTPError = require("got");


// Start the server before running tests
test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
    const { port } = server.address();

	t.context.got = got.extend({
		prefixUrl: `http://localhost:${port}`,
        responseType: "json",
	});
});

// Close the server after all tests are done
test.after.always((t) => {
	t.context.server.close();
});

// Test for succesful POST /day
test("Happy Path: Successfully add a day to the trip", async (t) => {
    const userId = 1;
    const tripId = 101;

    const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day`, {});
  
    // The request should return a correct code an a response body
    t.is(response.statusCode, 200, "Response status should be 200");
    t.truthy(response.body, "Response should include a body");

    // The API is not connected to an actual dataBase so the id and dayNumber are artificial 
    // and thus cannot be tested properly

    // Validate that the returned trip has the correct id 
    // The artificial value is 101 so that is what will be tested.
    t.is(response.body.id, 101, "Returned day ID should be 101");

    // Validate the returned trip object
    const trip = response.body;

    // Ensure the trip object has the expected structure
    t.truthy(trip.daysList, "Response should include a daysList");
    t.true(Array.isArray(trip.daysList), "daysList should be an array");

    // Validate that a new Day has been added to the trip
    // Since there is no data Base to check whether a new Day has been added 
    // we will check that the daysList is not empty
    t.true(trip.daysList.length > 0, "daysList should not be empty");

});


// Test for the happy path (valid integers) with a different approach
test('POST ../day Happy path: Valid input parameters', async (t) => {
    const userId = 1;
    const tripId = 1;
  
    try {
      const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day`, {});
  
      t.is(response.statusCode, 200, 'Response status should be 200');
      t.truthy(response.body, 'Response body should not be empty');
      const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      t.true(responseBody.daysList.length > 0, "daysList should not be empty");
      t.is(responseBody.daysList[0].dayNumber, 1, 'Returned dayNumber should match the generated value');
  
    } catch (error) {
      t.fail(`Unexpected error: ${error.message}`);
    }
});
  
// Test for invalid userId
test('/POST ../day Unhappy path: Invalid userId type (string instead of integer)', async (t) => {
    const userId = 'abc'; // String instead of an integer
    const tripId = 1;
  
    try {
      const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day`, {});
  
      // Expecting a 400 error response, so if we reach here, the test should fail
      t.fail('Expected a 400 status code response, but the request succeeded');
    } catch (error) {
      if (error.response) {
        // Check if the error response is as expected
        t.is(error.response.statusCode, 400, 'Expected status code 400 for validation error');
        const errorBody = typeof error.response.body === 'string'
          ? JSON.parse(error.response.body)
          : error.response.body;
        t.is(errorBody.message, 'request.params.userId should be integer', 'Error message should indicate invalid userId type');
      } else {
        // If the error does not have a response property, it's unexpected
        t.fail('Unexpected error: ' + error.message);
      }
    }
});
  
// Test for invalid tripId
test('POST ../day Unhappy path: Invalid tripId type (string instead of integer)', async (t) => {
    const userId = 1; // Valid userId
    const tripId = 'xyz'; // Invalid tripId
  
    try {
      await t.context.got.post(`user/${userId}/trip/${tripId}/day`);
      t.fail('Expected a 400 status code response, but the request was successful');
    } catch (error) {
      if (error.response) {
        // Check if the body is already parsed as an object
        const errorBody = typeof error.response.body === 'string'
          ? JSON.parse(error.response.body)
          : error.response.body;
  
        t.is(error.response.statusCode, 400, 'Expected status code 400 for validation error');
        t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
  
        // Check specific validation error details
        t.true(
          errorBody.errors.some((e) => e.path === '.params.tripId' && e.message === 'should be integer'),
          'Expected validation error for tripId'
        );
      } else {
        t.fail('Unexpected error type');
      }
    }
});
  


// Test for both invalid userId and invalid tripId
test('POST ../day Unhappy path: Invalid userId and tripId types', async (t) => {
    const userId = 'abc'; // Invalid userId
    const tripId = 'xyz'; // Invalid tripId
  
    try {
      await t.context.got.post(`user/${userId}/trip/${tripId}/day`);
      t.fail('Expected a 400 status code response, but the request was successful');
    } catch (error) {
      if (error.response) {
        // Check if the body is already parsed as an object
        const errorBody = typeof error.response.body === 'string'
          ? JSON.parse(error.response.body)
          : error.response.body;
  
        t.is(error.response.statusCode, 400, 'Expected status code 400 for validation error');
        t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
  
        // Check specific validation error details
        t.true(
          errorBody.errors.some((e) => e.path === '.params.userId' && e.message === 'should be integer'),
          'Expected validation error for userId'
        );
        t.true(
          errorBody.errors.some((e) => e.path === '.params.tripId' && e.message === 'should be integer'),
          'Expected validation error for tripId'
        );
      } else {
        t.fail('Unexpected error type');
      }
    }
});
  
  
// Test for null userId
test('POST ../ day Unhappy path: Null userId', async (t) => {
    const userId = null; // Null userId
    const tripId = 1; // Valid tripId
  
    try {
      await t.context.got.post(`user/${userId}/trip/${tripId}/day`);
      t.fail('Expected a 400 status code response, but the request was successful');
    } catch (error) {
      if (error.response) {
        const errorBody = typeof error.response.body === 'string'
          ? JSON.parse(error.response.body)
          : error.response.body;
  
        t.is(error.response.statusCode, 400, 'Expected status code 400 for validation error');
        t.truthy(errorBody.errors, 'Expected error body to contain validation errors');
  
        // Check for specific validation error for userId being null
        t.true(
          errorBody.errors.some((e) => e.path === '.params.userId' && e.message === 'should be integer'),
          'Expected validation error for userId'
        );
      } else {
        t.fail('Unexpected error type');
      }
    }
});
  

// Test for missing parameters 
test('POST ../day Unhappy path: Missing parameters', async (t) => {
    const userId = ''; // Missing userId
    const tripId = ''; // Missing tripId
  
    try {
      const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day`, {
        json: {} // Send an empty JSON body if necessary
      });
  
      // Check if the status code matches the actual response (e.g., 404)
      t.is(response.statusCode, 404, 'Expected status code 404 for missing parameters');
    } catch (error) {
      // Check if the error has a response property and matches the expected error
      if (error.response) {
        t.is(error.response.statusCode, 404, 'Expected status code 404 for missing parameters');
      } else {
        t.fail(`Unexpected error: ${error.message}`);
      }
    }
});
  

  // Check for user//trip//day
test('/POST ../day Unhappy path: Empty path parameters', async (t) => {
    try {
      // Send the request with empty path parameters
      const response = await t.context.got.post('user//trip//day', {
        json: {} // Sending an empty JSON body if needed
      });
  
      // Check if the response is a 404 (Not Found) or 400 (Bad Request)
      t.is(response.statusCode, 404, 'Expected status code 404 if the route does not exist or is not matched');
  
    } catch (error) {
      // Check if the error is an HTTP error and if the status code matches what you expect
      if (error.response) {
        t.is(error.response.statusCode, 404, 'Expected status code 404 if the route does not exist or is not matched');
      } else {
        // Handle unexpected errors or cases where the error response is not structured as expected
        t.fail(`Unexpected error: ${error.message}`);
      }
    }
});
  
// Test for GET /user/{userId}/trip/{tripId}/day 
test('GET ../day Unhappy path: Unexpected HTTP methods', async (t) => {
    const userId = 1;
    const tripId = 1;
  
    // Test with GET request instead of POST
    try {
      await t.context.got.get(`user/${userId}/trip/${tripId}/day`);
      t.fail('Expected a 405 status code response, but the request was successful');
    } catch (error) {
      t.is(error.response.statusCode, 405, 'Expected status code 405 for method not allowed');
    }
});
    

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
  
  