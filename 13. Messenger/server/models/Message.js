const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    thread: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Thread',
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;