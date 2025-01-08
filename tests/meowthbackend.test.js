const test = require("ava");
const test_init = require("../test_init");

// Initialize the test environment
test_init();

/**
 * Centralized Route Definitions
 * ROUTES object contains all the API endpoint paths used in the test suite.
 * This avoids hardcoding paths multiple times, improving maintainability and clarity.
 */
const ROUTES = {
  getTrip: (userId, tripId) => `user/${userId}/trip/${tripId}`, // GET trip details
  addAccommodation: (userId, tripId) => `user/${userId}/trip/${tripId}/accommodation`, // POST accommodation
  addTransportation: (userId, tripId) => `user/${userId}/trip/${tripId}/transportation`, // POST transportation
};

/**
 * Test: GET /user/:id/trip/:id
 * Validates that the API correctly retrieves the details of a trip.
 */
test("GET /user/:id/trip/:id should return the trip details", async (t) => {
  const id = 101; // Example user and trip ID

  // Perform a GET request to retrieve trip details
  const response = await t.context.got(ROUTES.getTrip(id, id));

  // Assert that the response status code is 200 (OK)
  t.is(response.statusCode, 200, "Expected a 200 status code");

  const body = typeof response.body === "string" ? JSON.parse(response.body) : response.body; // Parse body if it's a string

  // Assert trip details
  t.is(body.id, 101, "Expected trip ID to be 101");
  t.is(body.name, "Beach Vacation", "Expected trip name to be 'Beach Vacation'");

  // Assert transportation details
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
  const id = 101; // Example user and trip ID
  const newAccommodation = {
    name: "Paradise Inn",
    address: "123 Beach Road, Maldives",
    price: 1500,
  };

  // Perform a POST request to add accommodation
  const response = await t.context.got.post(ROUTES.addAccommodation(id, id), {
    json: newAccommodation, // Send the accommodation data as JSON
    responseType: "json", // Automatically parse JSON response
  });

  // Assert that the response status code is 200 (OK)
  t.is(response.statusCode, 200, "Expected a 200 status code");

  const body = response.body; // Extract the response body

  // Assert accommodation details
  t.is(body.accommodation.name, "Paradise Inn", "Expected accommodation name to match");
  t.is(body.accommodation.address, "123 Beach Road, Maldives", "Expected accommodation address to match");
  t.is(body.accommodation.price, 1500, "Expected accommodation price to match");
});

/**
 * Test: POST /user/:id/trip/:id/transportation
 * Validates that the API correctly adds transportation to a trip.
 */
test("POST /user/:id/trip/:id/transportation should add transportation", async (t) => {
  const id = 101; // Example user and trip ID
  const newTransportation = {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  };

  // Perform a POST request to add transportation
  const response = await t.context.got.post(ROUTES.addTransportation(id, id), {
    json: newTransportation, // Send the transportation data as JSON
    responseType: "json", // Automatically parse JSON response
  });

  // Assert that the response status code is 200 (OK)
  t.is(response.statusCode, 200, "Expected a 200 status code");

  const body = response.body; // Extract the response body

  // Assert transportation details
  t.is(body.transportation.name, "Flight", "Expected transportation name to match");
  t.is(body.transportation.date, "2024-12-20", "Expected transportation date to match");
  t.is(body.transportation.time, 930, "Expected transportation time to match");
});