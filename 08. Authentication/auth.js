const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('log-in');
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    req.session.user = username;
    req.session.password = password;
    res.redirect('/');
});

module.exports = router;