const fs = require('fs');

function homeHandler(req, res) {
    if (req.path == "/" || req.path == "/index.html") {
        fs.readFile('./index.html', 'utf8', (err, data) => {
            res.writeHead(200, {
                "context-type": "text/html"
            });
            res.write(data);
            res.end();
        });
    }
    else{
        return true;
    }
}

module.exports = homeHandler;