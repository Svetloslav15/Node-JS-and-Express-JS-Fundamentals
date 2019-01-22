const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    url: {type: String},
    creationDate: {type: Date},
    title: {type: String},
    description: {type: String},
    tags: []
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;

