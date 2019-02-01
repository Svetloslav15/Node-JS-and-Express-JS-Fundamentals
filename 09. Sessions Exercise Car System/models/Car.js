const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
   model: {type: String, required: true},
   image: {type: String, required: true},
   pricePerDay: {type: Number, required: true},
   isRented: {type: Boolean, required: true, default: false}
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;