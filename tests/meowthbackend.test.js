const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");
const { emitWarning } = require("process");

// Start the server before running tests
test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`,
        responseType: 'json' // Automatically parse JSON responses
    });
});

// Close the server after all tests are done
test.after.always((t) => {
    t.context.server.close();
});

// Test: GET /user/:userId/trip/:tripId
test("GET /user/:userId/trip/:tripId should return a specific trip", async (t) => {
    const userId = "123";
    const tripId = "456";

    const response = await t.context.got(`user/${userId}/trip/${tripId}`);
    t.is(response.statusCode, 200); // Assuming success status is 200
    t.truthy(response.body.tripId); // Ensure tripId exists in the response
    t.is(response.body.tripId, tripId);
});

// Test: POST /user/:userId/trip/:tripId/accommodation
test("POST /user/:userId/trip/:tripId/accommodation should add an accommodation", async (t) => {
    const userId = "123";
    const tripId = "456";
    const accommodation = {
        name: "Hotel XYZ",
        address: "123 Main St",
        price: 100
    };

    const response = await t.context.got.post(`user/${userId}/trip/${tripId}/accommodation`, {
        json: accommodation
    });

    t.is(response.statusCode, 201); // Assuming success status is 201
    t.is(response.body.message, "Accommodation added successfully");
});

// Test: POST /user/:userId/trip/:tripId/transportation
test("POST /user/:userId/trip/:tripId/transportation should add a transportation method", async (t) => {
    const userId = "123";
    const tripId = "456";
    const transportation = {
        type: "Flight",
        company: "Air XYZ",
        price: 200
    };

    const response = await t.context.got.post(`user/${userId}/trip/${tripId}/transportation`, {
        json: transportation
    });

    t.is(response.statusCode, 201); // Assuming success status is 201
    t.is(response.body.message, "Transportation added successfully");
});


