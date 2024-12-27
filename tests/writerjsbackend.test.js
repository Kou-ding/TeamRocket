const test = require("ava");
const { respondWithCode, writeJson } = require("../utils/writer.js");

// Test the respondWithCode function
test('respondWithCode creates a ResponsePayload object correctly', t => {
    const code = 201;
    const payload = { message: 'Created' };
    const responsePayload = respondWithCode(code, payload);
  
    t.is(responsePayload.code, code);
    t.deepEqual(responsePayload.payload, payload);
});

// Test the writeJson function with default status code
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

    writeJson(response, payload);

    t.is(statusCode, 200);
    t.deepEqual(headers, { 'Content-Type': 'application/json' });
    t.is(body, JSON.stringify(payload, null, 2));
});

// Test the writeJson function with a provided status code
test('writeJson writes response with provided code', t => {
    const payload = { message: 'Custom code' };
    const customCode = 201;
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

    writeJson(response, payload, customCode);

    t.is(statusCode, customCode);
    t.deepEqual(headers, { 'Content-Type': 'application/json' });
    t.is(body, JSON.stringify(payload, null, 2));
});

// Test the writeJson function with non-object payloads
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

    writeJson(response, payload, code);

    t.is(statusCode, code);
    t.deepEqual(headers, { 'Content-Type': 'application/json' });
    t.is(body, payload);
});

// Test the writeJson function with no payload provided
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

    writeJson(response, undefined, code);

    t.is(statusCode, code);
    t.deepEqual(headers, { 'Content-Type': 'application/json' });
    t.is(body, '');
});