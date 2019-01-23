const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: {type:String, required: true},
    creationDate: {type:Date, required: true, default: Date.now()},
    images: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Image'}]
});

let Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;