const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = 8000;

app.use(express.static('public'));

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.get('/', (req, res) => {
    res.render('home', {user: "Svetloslav Novoselski!"});
});


app.get("*", (req, res) => {
    res.status(404);
    res.send("404 Not found!");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));