const fs = require('fs');

function getContentType(path) {
    if (path.endsWith('.css')){
        return 'text/css';
    }
    else if (path.endsWith('.ico')){
        return 'image/x-icon';
    }
    else if (path.endsWith('.png')){
        return 'image/png';
    }
    else if (path.endsWith('.jpg')){
        return 'image/jpg';
    }
}

module.exports = (req, res) => {
    if (req.path.startsWith('/views/home.html') && req.method == 'GET'){
        fs.readFile(`./views.home.html`, (err, data) => {
            if (err){
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': getContentType(req.path)
            });
            res.write(data);
            res.end();
        });
    }
    else {
        return true;
    }
};