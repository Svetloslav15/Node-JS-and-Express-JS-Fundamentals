const mongoose = require('mongoose');
const connectionString = 'mmongodb://localhost:27017/mongo-db-playground';
const Tag = require('../models/TagSchema');
const Image = require('../models/ImageSchema');

mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect(connectionString);
    let db = mongoose.connection;

    db.once('open', err => {
       if (err){
           throw err;
       }
       console.log('MongoDB ready!')
    });


    db.once('error', err => console.log(`Database error: ${err}`));
};