import http from "node:http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../index.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({
		responseType: "json", 
		prefixUrl: `http://localhost:${port}`
	});
});

test.after.always((t) => {
	t.context.server.close();
});

// Test the /docs endpoint
test("GET /docs should return status 200", async (t) => {
	try {
        const response = await t.context.got('docs');
        
        // Log response details for debugging
        console.log('Response Status Code:', response.statusCode);
        console.log('Response Headers:', response.headers);
        console.log('Response Body:', response.body);
        
        t.is(response.statusCode, 200, "Expected a 200 status code");
    } catch (error) {
        // Enhanced error logging
        console.error('Test Error:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
            response: error.response?.body
        });
        
        throw error;
    }
	// const response = await t.context.got('docs');  // equivalent to: http://localhost:8080/docs
	// // Log the full response
	// console.log('Response Body:', response.body);  // Prints the body of the response
	// console.log('Response Status Code:', response.statusCode);  // Prints the status code
	// console.log('Response Headers:', response.headers);  // Prints the headers
	// //const { statusCode } = await t.context.got("docs");
	// //t.is(statusCode, 200, "Expected a 200 status code");
});
