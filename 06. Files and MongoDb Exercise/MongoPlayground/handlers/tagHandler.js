const formidable = require('formidable');
const Tag = require('mongoose').model('Tag');
const util = require('util');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            res.writeHead(200, {'content-type': 'text/plain'});
            let name = fields.tagName;
            Tag.create({
                name,
                images: [],
            }).then(tag => {
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
        });


    } else {
        return true
    }
}
