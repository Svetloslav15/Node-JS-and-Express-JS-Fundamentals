const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 5000;
const staticHandler = require('./handlers/static.js');
const homeHandler = require('./handlers/home.js');
const errorHandler = require('./handlers/error.js');

let server = http.createServer(frontController);

/**
 *
 * @param {http.ClientRequest} req
 * @param {http.ClientResponse} res
 */

function frontController(req, res) {
    const path = url.parse(req.url).pathname;

    const handlers = [homeHandler, errorHandler, staticHandler];

    for (let handler of handlers) {
        if (handler(req, res) !== true){
            break;
        }

    }
}

server.listen(port);
console.log(`Listening on port ${port}...`);