const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    dateCreated: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    }
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;