const fs = require('fs');

function staticHandler(req, res) {
    if (req.path.startsWith("static/")){
        if (req.path.endsWith('.css')){
            res.writeHead(200, {
                'content-type': 'text/css'
            });
        }
        else if (req.path.endsWith('.js')){
            res.writeHead(200, {
                'content-type': 'application/javascript'
            });
        }
        fs.readFile(`.${req.path}`, "utf8", (err, data) => {
            res.write(data);
            res.end();
        });
    }
    else{
        return true;
    }
}

module.exports = staticHandler;