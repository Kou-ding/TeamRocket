const test = require("ava");
const { respondWithCode, writeJson } = require("../utils/writer.js");

// Successful ResponsePayload object creation test
test('respondWithCode creates a ResponsePayload object correctly', t => {
	const code = 201;
	const payload = { message: 'Created' };
	const responsePayload = respondWithCode(code, payload);
	
	// Check if the ResponsePayload object has the correct code and payload
	t.is(responsePayload.code, code);
	t.deepEqual(responsePayload.payload, payload);
});

// Default code test
test('writeJson writes response with default code 200 if no code is provided', t => {
	const payload = { message: 'Default code' };
	let statusCode;
	let headers;
	let body;
	const response = {
		writeHead: (code, hdrs) => {
			statusCode = code;
			headers = hdrs;
		},
		end: (data) => {
			body = data;
		}
	};
	// Call writeJson with response object and payload
	writeJson(response, payload);

	// Check if the response was written with the correct status code, headers, and body
	t.is(statusCode, 200);
	t.deepEqual(headers, { 'Content-Type': 'application/json' });
	t.is(body, JSON.stringify(payload, null, 2));
});

// Provided code and payload test
test('writeJson writes response with provided code and payload', t => {
	const payload = { message: 'Success' };
	const code = 201;
	let statusCode;
	let headers;
	let body;
	const response = {
		writeHead: (code, hdrs) => {
			statusCode = code;
			headers = hdrs;
		},
		end: (data) => {
			body = data;
		}
	};

	// Call writeJson with response object, payload, and code
	writeJson(response, payload, code);

	// Check if the response was written with the correct status code, headers, and body
	t.is(statusCode, code);
	t.deepEqual(headers, { 'Content-Type': 'application/json' });
	t.is(body, JSON.stringify(payload, null, 2));
});

// ResponsePayload object test
test('writeJson handles a ResponsePayload object correctly', t => {
	const code = 202;
	const payload = { message: 'Accepted' };
	const responsePayload = respondWithCode(code, payload);
	let statusCode;
	let headers;
	let body;
	const response = {
		writeHead: (code, hdrs) => {
			statusCode = code;
			headers = hdrs;
		},
		end: (data) => {
			body = data;
		}
	};

	// Call writeJson with response object and ResponsePayload object
	writeJson(response, responsePayload);

	// Check if the response was written with the correct status code, headers, and body
	t.is(statusCode, code);
	t.deepEqual(headers, { 'Content-Type': 'application/json' });
	t.is(body, JSON.stringify(payload, null, 2));
});

// Non-object payload test
test('writeJson handles non-object payloads correctly', t => {
	const payload = 'Plain text response';
	const code = 400;
	let statusCode;
	let headers;
	let body;
	const response = {
		writeHead: (code, hdrs) => {
			statusCode = code;
			headers = hdrs;
		},
		end: (data) => {
			body = data;
		}
	};

	// Call writeJson with response object and non-object payload
	writeJson(response, payload, code);

	// Check if the response was written with the correct status code, headers, and body
	t.is(statusCode, code);
	t.deepEqual(headers, { 'Content-Type': 'application/json' });
	t.is(body, payload);
});

// No payload provided test
test('writeJson defaults payload to empty string if no payload is provided', t => {
	const code = 204;
	let statusCode;
	let headers;
	let body;
	const response = {
		writeHead: (code, hdrs) => {
			statusCode = code;
			headers = hdrs;
		},
		end: (data) => {
			body = data;
		}
	};

	// Call writeJson with response object and no payload
	writeJson(response, null, code);

	// Check if the response was written with the correct status code, headers, and body
	t.is(statusCode, code);
	t.deepEqual(headers, { 'Content-Type': 'application/json' });
	t.is(body, undefined);
});