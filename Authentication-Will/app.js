const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
let User = require('./models/user');
const port = 1000;
let app = express();
app.use(bodyParser());
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
require('./db')();
app.set('view engine', '.hbs');
app.use(session({
    secret: 'svetli'
}));
app.get('/', (req, res) => {
    if (!req.session.user) {
        res.send('Who you are!');
    }
    else {
        res.send(`Hello ${req.session.user.username}!`);
    }
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    req.session.user = user;
    res.redirect('/');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    let userBody = {
        username: req.body.username,
        password: req.body.password
    };
    let user = new User(userBody);
    user.save()
        .then(() => {
            user.generateToken()
                .then((token) => {
                    res.header('x-auth', token)
                       .send(user);
                });
        }).catch((err) => {
        res.status(400).send(err);
    });
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
