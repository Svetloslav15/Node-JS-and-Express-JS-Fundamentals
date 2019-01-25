const mongoose = require('mongoose');

let cubeSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    difficulty: {type: Number, required: true}
});

let Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;