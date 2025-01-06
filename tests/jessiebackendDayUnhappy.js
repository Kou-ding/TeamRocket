// filepath: /home/kou/Documents/TeamRocket/tests/jessiebackendDay.test.js
const test = require("ava");
const test_init = require("../test_init");

// Initialize the test environment
test_init();

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
