const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("./index.js");

function test_init() {
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
}

module.exports = test_init;