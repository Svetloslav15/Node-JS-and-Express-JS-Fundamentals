const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            _id: {
                type: String
            }
        }
    ]
});

let User = mongoose.model('User', schema);

schema.methods.generateToken = function (){
    let user = this;
    let token = jwt.sign({_id: user._id.toHexString()}, 'secret');
    user.tokens.push(token);
    debugger
    return user.save()
        .then(() => token)
        .catch((err) => console.log(err));
};
module.exports = User;