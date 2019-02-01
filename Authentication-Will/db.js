const mongoose = require('mongoose');
let User = require('./models/user');
mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/demo');
    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            throw err;
        }

        console.log('MongoDB ready!')

    });

    db.on('error', err => console.log(`Database error: ${err}`))
};