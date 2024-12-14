'use strict';

var chalk = require('chalk');
var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');

var serverPort = 8080;

// NODE_ENV and PORT are environment variables
const { NODE_ENV, PORT } = process.env;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// // Redirect /redirect to /docs
// app.get('/redirect', (req, res) => {
//     res.redirect('/docs');  // Redirect to Swagger UI
// });

// // Route for root ("/") to display "It works"
// app.get('/', (req, res) => {
//     res.json({ body: "It works!" });
// });

const server = http.Server(app);
// Initialize the Swagger middleware
// http.createServer(app).listen(serverPort, function () {
//     console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
//     console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
// });
if (NODE_ENV !== "test") {
	server.listen(serverPort, () => {
        console.log(chalk.bold.cyan(`>>> Live at http://localhost:${serverPort}`));
        console.log(chalk.green(`Swagger-ui is available on http://localhost:${serverPort}/docs`));
    });
};


module.exports = app;
