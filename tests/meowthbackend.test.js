const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

// Define routes as constants for maintainability
const ROUTES = {
  getTrip: (userId, tripId) => `user/${userId}/trip/${tripId}`,
  addAccommodation: (userId, tripId) => `user/${userId}/trip/${tripId}/accommodation`,
  addTransportation: (userId, tripId) => `user/${userId}/trip/${tripId}/transportation`,
};

// Utility to create and configure `got` instance
const createGotInstance = (server) => {
  const { port } = server.address();
  return got.extend({
    prefixUrl: `http://localhost:${port}`,
    responseType: "json",
  });
};

// Shared function to assert API responses
const assertResponse = (t, response, expectedStatusCode, message = "") => {
  t.is(response.statusCode, expectedStatusCode, message || `Expected status ${expectedStatusCode}`);
};

// Start the server before running tests
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.server.listen();
  t.context.got = createGotInstance(t.context.server);
});

// Close the server after all tests are done
test.after.always((t) => {
  t.context.server.close();
});

// Test: GET /user/:id/trip/:id
test("GET /user/:id/trip/:id should return trip details", async (t) => {
  const userId = 101;
  const tripId = 101;

  const response = await t.context.got(ROUTES.getTrip(userId, tripId));
  assertResponse(t, response, 200, "Trip details API should return 200 status");

  const body = response.body;
  t.is(body.id, tripId, "Expected trip ID to match");
  t.is(body.name, "Beach Vacation", "Expected trip name to match");
  t.deepEqual(body.transportation, {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  }, "Expected transportation details to match");
});

// Test: POST /user/:id/trip/:id/accommodation
test("POST /user/:id/trip/:id/accommodation should add accommodation", async (t) => {
  const userId = 101;
  const tripId = 101;
  const newAccommodation = {
    name: "Paradise Inn",
    address: "123 Beach Road, Maldives",
    price: 1500,
  };

  const response = await t.context.got.post(ROUTES.addAccommodation(userId, tripId), {
    json: newAccommodation,
  });

  assertResponse(t, response, 200, "Add accommodation API should return 200 status");

  const body = response.body;
  t.is(body.accommodation.name, newAccommodation.name, "Expected accommodation name to match");
  t.is(body.accommodation.address, newAccommodation.address, "Expected accommodation address to match");
  t.is(body.accommodation.price, newAccommodation.price, "Expected accommodation price to match");
});

// Test: POST /user/:id/trip/:id/transportation
test("POST /user/:id/trip/:id/transportation should add transportation", async (t) => {
  const userId = 101;
  const tripId = 101;
  const newTransportation = {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  };

  const response = await t.context.got.post(ROUTES.addTransportation(userId, tripId), {
    json: newTransportation,
  });

  assertResponse(t, response, 200, "Add transportation API should return 200 status");

  const body = response.body;
  t.is(body.transportation.name, newTransportation.name, "Expected transportation name to match");
  t.is(body.transportation.date, newTransportation.date, "Expected transportation date to match");
  t.is(body.transportation.time, newTransportation.time, "Expected transportation time to match");
});
