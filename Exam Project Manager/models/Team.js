const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    projects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Project'
        }
    ],
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;