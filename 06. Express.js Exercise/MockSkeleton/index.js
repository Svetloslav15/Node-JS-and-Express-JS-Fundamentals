const db = require('./config/dataBase')
const dbTag = require('./config/tagDb')
const port = 2323;
const express = require('express');
const app = express();
const homeModule = require('./modules/homeModule');

app.use('/public', express.static('./public'));

app.use('/', homeModule);
dbTag
  .load()
  .then(() => {
    db.load().then(() => {
        app.listen(port, () => {
            console.log('Im listening on ' + port)
        });
    })
  })
  .catch(() => {
    console.log('Failed to load DB')
  });