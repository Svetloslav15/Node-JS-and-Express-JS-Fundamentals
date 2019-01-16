const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
    res.send('Register');
});

router.get('/login', (req, res) => {
   res.send('Login');
});

module.exports = router;