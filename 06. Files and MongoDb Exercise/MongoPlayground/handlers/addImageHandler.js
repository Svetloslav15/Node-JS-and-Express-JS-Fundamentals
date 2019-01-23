const formidable = require('formidable');
const Image = require('mongoose').model('Image');

function addImage(req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let tags = fields.tagsId.split(',').reduce((p, c, i, a) => {
            if (p.includes(c) || c.length === 0){
                return p;
            }
            else {
                p.push(c);
                return p;
            }
        }, []);
        Image.create({
            url: fields.imageUrl,
            description: fields.description,
            tags: tags
        }).then(image => {
            res.writeHead(302, {
                location: "/"
            });
            res.end();
        }).catch(err => {
            res.writeHead(500, {
                'content-type': 'text/plain'
            });
            res.write('500 Server Error!');
            res.end();
        });
        res.writeHead(200, {'content-type': 'text/plain'});
    });
}

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res);
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res);
    } else {
        return true
    }
}
