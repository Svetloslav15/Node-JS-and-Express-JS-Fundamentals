const encryption = require('../util/encryption');
const User = require('../models/User');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        let userBody = req.body;

        if (!userBody.password || !userBody.repeatPassword || !userBody.repeatPassword) {
            userBody.error = 'Please fill all fields';
            res.render('user/register', userBody);
            return;
        }
        if (userBody.password !== userBody.repeatPassword) {
            userBody.error = 'Passwords should match!';
            res.render('user/register', userBody);
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, userBody.password);
        let user = await User.create({
            username: userBody.username,
            salt: salt,
            hashedPass: hashedPass,
            firstName: userBody.firstName,
            lastName: userBody.lastName,
            roles: ['User']
        });

        req.logIn(user, (err) => {
            if (err) {
                userBody.error = err;
                res.render('user/register', userBody);
            }
            else {
                res.redirect('/');
            }
        });
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/user/login');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        let userBody = req.body;
        let user = await User.findOne({
            username: userBody.username
        });
        if (!user) {
            userBody.error = 'Username is invalid!';
            res.render('user/login', userBody);
            return;
        }

        req.logIn(user, (err) => {
            if (err) {
                userBody.error = err;
                res.render('user/login', userBody);
            }
            else {
                res.redirect('/');
            }
        });
    }
};