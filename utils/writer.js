/**
 * Constructor function to create a ResponsePayload object.
 * @param {number} code - The HTTP status code.
 * @param {any} payload - The response payload.
 */
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

/**
 * Creates a new ResponsePayload object.
 * @param {number} code - The HTTP status code.
 * @param {any} payload - The response payload.
 * @returns {ResponsePayload} - The created ResponsePayload object.
 */
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

/**
 * Sends a JSON response with a specified status code.
 * @param {object} response - The HTTP response object.
 * @param {any} arg1 - The response payload or a ResponsePayload object.
 * @param {number} [arg2] - The HTTP status code.
 */
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // If arg1 is an instance of ResponsePayload, use its payload and code
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the response code from arg2 or arg1 if they are integers
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }

  // Set the payload
  if(code && arg1) {
    payload = arg1;
  } else if(arg1) {
    payload = arg1;
  }

  // Default to status code 200 if no code is provided
  if(!code) {
    code = 200;
  }

  // Convert payload to JSON string if it is an object
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write the response headers and end the response with the payload
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}