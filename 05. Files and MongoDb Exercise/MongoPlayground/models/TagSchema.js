const mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
    name: {type: String},
    creationDate: {type: Date},
    images: []
});

let Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;