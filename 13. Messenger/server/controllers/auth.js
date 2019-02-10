const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: (req, res) => {
        let reqUser = req.body;
        let {username, password, confirmPassword, firstName, lastName} = reqUser;

        if (username.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === "") {
            reqUser.globalError = 'Fields are required!';
            res.render('users/register', reqUser);
            return;
        }
        if (password !== confirmPassword){
            reqUser.globalError = 'Passwords don\'t match!';
            res.render('users/register', reqUser);
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, password);

        User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            salt: salt,
            hashedPass: hashedPassword,
            blockedUsers: [],
            roles: ['User']
        }).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                }

                res.redirect('/')
            })
        }).catch((err) => {
           res.locals.globalError = err;
           res.render('users/register', reqUser);
        });
    },
    loginGet: (req, res) => {
        res.render('users/login')
    },
    loginPost: (req, res) => {
        let reqUser = req.body;
        User.findOne({username: reqUser.username})
            .then(user => {
                if (!user) {
                    res.locals.globalError = 'Invalid user models';
                    res.render('users/login');
                    return
                }

                if (!user.authenticate(reqUser.password)) {
                    res.locals.globalError = 'Invalid user models';
                    res.render('users/login');
                    return
                }

                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err;
                        res.render('users/login');
                    }

                    res.redirect('/');
                })
            })
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};
