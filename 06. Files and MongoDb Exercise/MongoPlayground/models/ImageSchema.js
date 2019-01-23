const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    url: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now()},
    description: {type: String, },
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag'}]
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;