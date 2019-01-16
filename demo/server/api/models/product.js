const mongoose = require('mongoose');

let schema = mongoose.Schema({
   _id: mongoose.Types.ObjectId,
   name: String,
   price: Number
});

module.exports = schema;