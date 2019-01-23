const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/mongo-playground";

module.exports = () => {
    mongoose.connect(connectionString, {useNewUrlParser: true});
    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            throw err;
        }

        console.log('MongoDB ready!');

    });

    db.on('error', err => console.log(`Database error: ${err}`))
};