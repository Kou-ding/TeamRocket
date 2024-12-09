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

test("GET /user/:id/trip/:id should return the trip details", async (t) => {
    const id = 101;
  
    const response = await t.context.got(`user/${id}/trip/${id}`);
  
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
  
    // Assert trip details
    t.is(body.id, 101, "Expected trip ID to be 101");
    t.is(body.name, "Beach Vacation", "Expected trip name to be 'Beach Vacation'");
  
    // Assert transportation
    t.deepEqual(body.transportation, {
      name: "Flight",
      date: "2024-12-20", 
      time: 930,
    });
  });
  
test("POST /user/:id/trip/:id/accommodation should add accommodation", async (t) => {
    const id = 101;
    const newAccommodation = {
      name: "Paradise Inn",
      address: "123 Beach Road, Maldives",
      price: 1500,
    };
  
    const response = await t.context.got.post(`user/${id}/trip/${id}/accommodation`, {
      json: newAccommodation,
      responseType: "json", // Automatically parse JSON response
    });
  
    // Debugging: Log the response if the test fails
    if (response.statusCode !== 200) {
      console.log("Response Status:", response.statusCode);
      console.log("Response Body:", response.body);
    }
  
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = response.body;
  
    // Assert accommodation details
    t.is(body.accommodation.name, "Paradise Inn", "Expected accommodation name to match");
    t.is(body.accommodation.address, "123 Beach Road, Maldives", "Expected accommodation address to match");
    t.is(body.accommodation.price, 1500, "Expected accommodation price to match");
  });

test("POST /user/:id/trip/:id/transportation should add transportation", async (t) => {
    const id = 101; // Example ID for user and trip
    const newTransportation = {
      name: "Flight",
      date: "2024-12-20",
      time: 930,
    };
  
    const response = await t.context.got.post(`user/${id}/trip/${id}/transportation`, {
      json: newTransportation,
      responseType: "json", // Automatically parse JSON response
    });
  
    // Debugging: Log the response if the test fails
    if (response.statusCode !== 200) {
      console.log("Response Status:", response.statusCode);
      console.log("Response Body:", response.body);
    }
  
    // Assert the response status
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = response.body;
  
    // Assert the transportation details
    t.is(body.transportation.name, "Flight", "Expected transportation name to match");
    t.is(body.transportation.date, "2024-12-20", "Expected transportation date to match");
    t.is(body.transportation.time, 930, "Expected transportation time to match");
  });
  