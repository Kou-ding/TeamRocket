/**
 * Test Suite for Trip Management API
 * This suite tests the functionality of the Trip Management API, including retrieving trip details,
 * and adding accommodations and transportation for a trip. It uses the `ava` testing framework.
 */

const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js"); // Import the application instance

/**
 * Centralized Route Definitions
 * ROUTES object contains all the API endpoint paths used in the test suite.
 * This centralization avoids hardcoding paths multiple times, improving maintainability.
 */
const ROUTES = {
  getTrip: (userId, tripId) => `user/${userId}/trip/${tripId}`, // GET trip details
  addAccommodation: (userId, tripId) => `user/${userId}/trip/${tripId}/accommodation`, // POST accommodation
  addTransportation: (userId, tripId) => `user/${userId}/trip/${tripId}/transportation`, // POST transportation
};

/**
 * Utility to Create and Configure Got Instance
 * @param {Server} server - The server instance used for testing.
 * @returns {Got} - A `got` instance configured with the server's address and response type.
 * This function dynamically sets the `prefixUrl` based on the server's port,
 * ensuring that tests work on any available port.
 */
const createGotInstance = (server) => {
  const { port } = server.address(); // Retrieve the dynamically allocated port
  return got.extend({
    prefixUrl: `http://localhost:${port}`, // Prefix for all API requests
    responseType: "json", // Automatically parse JSON responses
  });
};

/**
 * Utility to Assert API Responses
 * @param {Object} t - Ava's test assertion context.
 * @param {Object} response - The HTTP response object returned by `got`.
 * @param {number} expectedStatusCode - The expected HTTP status code.
 * @param {string} [message=""] - Optional custom message for the assertion.
 * Centralizes response status code assertions to improve code readability and reduce redundancy.
 */
const assertResponse = (t, response, expectedStatusCode, message = "") => {
  t.is(response.statusCode, expectedStatusCode, message || `Expected status ${expectedStatusCode}`);
};

// Start the server before running tests
test.before(async (t) => {
  /**
   * `before` Hook
   * - Starts the server for the test suite.
   * - Configures the `got` instance for making HTTP requests.
   */
  t.context.server = http.createServer(app); // Create the HTTP server
  t.context.server.listen(); // Start the server
  t.context.got = createGotInstance(t.context.server); // Configure the `got` instance
});

// Close the server after all tests are done
test.after.always((t) => {
  /**
   * `after` Hook
   * - Ensures the server is closed after the tests complete.
   * - This prevents resource leaks and ensures a clean environment for subsequent tests.
   */
  t.context.server.close();
});

/**
 * Test: GET /user/:id/trip/:id
 * Validates that the API correctly retrieves the details of a trip.
 */
test("GET /user/:id/trip/:id should return trip details", async (t) => {
  const userId = 101; // Example user ID
  const tripId = 101; // Example trip ID

  // Make a GET request to retrieve trip details
  const response = await t.context.got(ROUTES.getTrip(userId, tripId));

  // Assert that the response status code is 200 (OK)
  assertResponse(t, response, 200, "Trip details API should return 200 status");

  const body = response.body; // Extract the response body
  t.is(body.id, tripId, "Expected trip ID to match");
  t.is(body.name, "Beach Vacation", "Expected trip name to match");
  t.deepEqual(
    body.transportation,
    {
      name: "Flight",
      date: "2024-12-20",
      time: 930,
    },
    "Expected transportation details to match"
  );
});

/**
 * Test: POST /user/:id/trip/:id/accommodation
 * Validates that the API correctly adds an accommodation to a trip.
 */
test("POST /user/:id/trip/:id/accommodation should add accommodation", async (t) => {
  const userId = 101; // Example user ID
  const tripId = 101; // Example trip ID
  const newAccommodation = {
    name: "Paradise Inn",
    address: "123 Beach Road, Maldives",
    price: 1500,
  };

  // Make a POST request to add accommodation
  const response = await t.context.got.post(ROUTES.addAccommodation(userId, tripId), {
    json: newAccommodation, // Request body
  });

  // Assert that the response status code is 200 (OK)
  assertResponse(t, response, 200, "Add accommodation API should return 200 status");

  const body = response.body; // Extract the response body
  t.is(body.accommodation.name, newAccommodation.name, "Expected accommodation name to match");
  t.is(body.accommodation.address, newAccommodation.address, "Expected accommodation address to match");
  t.is(body.accommodation.price, newAccommodation.price, "Expected accommodation price to match");
});

/**
 * Test: POST /user/:id/trip/:id/transportation
 * Validates that the API correctly adds transportation to a trip.
 */
test("POST /user/:id/trip/:id/transportation should add transportation", async (t) => {
  const userId = 101; // Example user ID
  const tripId = 101; // Example trip ID
  const newTransportation = {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  };

  // Make a POST request to add transportation
  const response = await t.context.got.post(ROUTES.addTransportation(userId, tripId), {
    json: newTransportation, // Request body
  });

  // Assert that the response status code is 200 (OK)
  assertResponse(t, response, 200, "Add transportation API should return 200 status");

  const body = response.body; // Extract the response body
  t.is(body.transportation.name, newTransportation.name, "Expected transportation name to match");
  t.is(body.transportation.date, newTransportation.date, "Expected transportation date to match");
  t.is(body.transportation.time, newTransportation.time, "Expected transportation time to match");
});
