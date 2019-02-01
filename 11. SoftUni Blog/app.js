const express = require('express')
const config = require('./config/config')
const app = express()
const port = 5000;
let env = 'development'
require('./config/database')(config[env])
require('./config/express')(app, config[env])
require('./config/passport')()
require('./config/routes')(app)

app.listen(port, () =>{
   console.log(`Listening on port ${port}...`);
});