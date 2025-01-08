// filepath: /home/kou/Documents/TeamRocket/tests/jessiebackendDay.test.js
const test = require("ava");
const test_init = require("../test_init");

// Initialize the test environment
test_init();

// Test for successful POST /day
test("Happy Path: Successfully add a day to the trip", async (t) => {
    const userId = 1;
    const tripId = 101;

    const response = await t.context.got.post(`user/${userId}/trip/${tripId}/day`, {});
  
    // The request should return a correct code an a response body
    t.is(response.statusCode, 200, "Response status should be 200");
    t.truthy(response.body, "Response should include a body");

    // The API is not connected to an actual dataBase so the id and dayNumber are artificial 
    // and thus cannot be tested properly

    // Ensure the response body is parsed as JSON
    const body = JSON.parse(response.body);

    // Validate that the returned trip has the correct id 
    // The artificial value is 101 so that is what will be tested.
    t.is(body.id, 101, "Returned day ID should be 101");

    // Ensure the trip object has the expected structure
    t.truthy(body.daysList, "Response should include a daysList");
    t.true(Array.isArray(body.daysList), "daysList should be an array");

    // Validate that a new Day has been added to the trip
    // Since there is no data Base to check whether a new Day has been added 
    // we will check that the daysList is not empty
    t.true(body.daysList.length > 0, "daysList should not be empty");
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
  