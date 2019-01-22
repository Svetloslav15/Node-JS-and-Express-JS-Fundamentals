const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const database = require('../config/database');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/product/add' && req.method === 'GET'){
        res.write('This is home page.')
        res.end();
    }

}