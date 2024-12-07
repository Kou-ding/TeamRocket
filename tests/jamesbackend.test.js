const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

// Start the server before running tests
test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({
		prefixUrl: `http://localhost:${port}`
	});
});

// Close the server after all tests are done
test.after.always((t) => {
	t.context.server.close();
});

// Test the /docs endpoint
test("GET /docs should return status 200", async (t) => {
	const response = await t.context.got('docs/');  // equivalent to: http://localhost:8080/docs
    // Debugging: Log the full response 
	// console.log('Response Body:', response.body);  // Prints the body of the response
	// console.log('Response Status Code:', response.statusCode);  // Prints the status code
	// console.log('Response Headers:', response.headers);  // Prints the headers
    t.is(response.statusCode, 200, "Expected a 200 status code");
    t.is(response.headers["content-type"], "text/html; charset=UTF-8", "Expected a text/html content type");
    t.is(response.headers["swagger-api-docs-url"], "/api-docs", "Expected a /api-docs URL");
    t.is(response.body.includes("Swagger UI"), true, "Expected the response body to include 'Swagger UI'");
});

test("POST /user should return the user", async (t) => {
	const response = await t.context.got.post('user/', {
		json: {
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: "secret123"
		}
	});

	t.is(response.statusCode, 200, "Expected a 200 status code");
	const body = JSON.parse(response.body);
	t.is(body.id, 1, "Expected user ID to be 1");
	t.is(body.name, "John Doe", "Expected user name to be 'John Doe'");
	t.is(body.email, "john.doe@example.com", "Expected user email to be 'john.doe@example.com'");
});

test("GET /user/", async (t) => {
	// Wait for the response
	const response = await t.context.got('user/1');

	// Parse the response body
	const body = JSON.parse(response.body);

	// Assert the status code is 200
	t.is(response.statusCode, 200, "Expected a 200 status code");

	// Assert the response body is an array
	t.true(Array.isArray(body), "Expected response body to be an array");

	// Test the first trip in the array
	const trip = body[0]; 
	t.truthy(trip, "Expected at least one trip in the response");

	// Check specific properties of the trip
	t.is(trip.name, "Beach Vacation", "Expected trip name to be 'Beach Vacation'");
	t.is(trip.dates, "2024-12-20 to 2024-12-27", "Expected trip dates to be '2024-12-20 to 2024-12-27'");
	t.is(trip.budget, 5000, "Expected trip budget to be 5000");
});

test("POST /user/1/trip should return the trip", async (t) => {
	// Define the new trip
	const response = await t.context.got.post('user/1/trip', {
		json:{
			"id": 101,
			"name": "Beach Vacation",
			"destination": "Maldives",
			"dates": "2024-12-20 to 2024-12-27",
			"budget": 5000,
			"isPast": false,
			"accommodation": {
			  "name": "Paradise Inn",
			  "address": "123 Beach Road, Maldives",
			  "price": 1500
			},
			"transportation": {
			  "name": "Flight",
			  "date": "2024-12-20",
			  "time": 930
			},
			"daysList": [
			  {
				"dayNumber": 1,
				"id": 1,
				"activityList": [
				  {
					"name": "Snorkeling",
					"description": "Explore the coral reefs.",
					"lockedStatus": false
				  }
				]
			  }
			]
		},
	});

	// Check the status code
	t.is(response.statusCode, 200, "Expected a 200 status code");

	// Parse the response body
	const body = JSON.parse(response.body);

	// Test some attributes of the response body
	t.is(body.name, "Beach Vacation", "Expected trip name to be 'Beach Vacation'");
	t.is(body.dates, "2024-12-20 to 2024-12-27", "Expected trip dates to be '2024-12-20 to 2024-12-27'");
	t.is(body.budget, 5000, "Expected trip budget to be 5000");
});

