const mongoose = require('mongoose');
const User = require('../models/User');
const Car = require('../models/Car');
const Rent = require('../models/Rent');

mongoose.Promise = global.Promise;
module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        }
        User.seedAdmin()
            .then(() => {
                console.log('Database ready!');
            }).catch(console.error);
    });
    db.on('error', reason => {
        console.log(reason);
    });
};