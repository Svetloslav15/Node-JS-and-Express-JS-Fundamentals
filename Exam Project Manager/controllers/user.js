const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;

        if (reqUser.username.trim() === "" || reqUser.password.trim() === "" ||
            reqUser.firstName.trim() === "" || reqUser.lastName.trim() === "") {
            res.locals.globalError = 'Fields are required!';
            res.render('users/register', reqUser);
            return;
        }
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            let profilePicture = req.body.profilePicture;
            let user;
            if (profilePicture == "") {
                user = await User.create({
                    username: reqUser.username,
                    hashedPass,
                    salt,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    roles: ['User'],
                    teams: [],
                });
            }
            else {
                user = await User.create({
                    username: reqUser.username,
                    hashedPass,
                    salt,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    roles: ['User'],
                    teams: [],
                    profilePicture: profilePicture
                });
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({username: reqUser.username});
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    }
};