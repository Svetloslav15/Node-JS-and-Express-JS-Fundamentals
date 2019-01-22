const http = require('http')
const url = require('url')
const qs = require('querystring')
const port = process.env.PORT || 8000
const handlers = require('./handlers/handlerBlender')
const db = require('./config/db');

require('./config/db')

http
  .createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname
    req.pathquery = qs.parse(url.parse(req.url).query)
    for (let handler of handlers) {
      if (!handler(req, res)) {
        break
      }
    }
      db();
  })
  .listen(port)




