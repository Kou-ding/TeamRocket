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
    // Log the full response
	// console.log('Response Body:', response.body);  // Prints the body of the response
	// console.log('Response Status Code:', response.statusCode);  // Prints the status code
	// console.log('Response Headers:', response.headers);  // Prints the headers
    t.is(response.statusCode, 200, "Expected a 200 status code");
    t.is(response.headers["content-type"], "text/html; charset=UTF-8", "Expected a text/html content type");
    t.is(response.headers["swagger-api-docs-url"], "/api-docs", "Expected a /api-docs URL");
    t.is(response.body.includes("Swagger UI"), true, "Expected the response body to include 'Swagger UI'");
});
