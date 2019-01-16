const http = require('http');
const fs = require('fs');
const server = http.createServer(frontController);
const port = process.env.PORT || 8000;

server.listen(port);

function frontController(req, res) {
    fs.readFile('./index.html', 'utf8', (err, data) => {
        res.writeHead('200', {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    });
}