const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    profilePicture: {type: mongoose.Schema.Types.String, default: 'https://static.thenounproject.com/png/17241-200.png'},
    salt: { type: mongoose.Schema.Types.String, required: true },
    teams:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    roles: [{ type: mongoose.Schema.Types.String }]
});
userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123456');
        return User.create({
            username: 'Admin',
            salt,
            hashedPass,
            teams: [],
            firstName: 'Admin',
            lastName: 'Adminov',
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
