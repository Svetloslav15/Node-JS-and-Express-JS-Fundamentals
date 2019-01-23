const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const appRouter = require('./auth');
const app = express();

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', ".hbs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "svetli"
}));
app.use('/auth', appRouter);
app.use((req, res, next) => {
   if (req.session.user === undefined){
       res.redirect('/login');
   }
   else{
       next();
   }
});
let products = [
    {name: "Rolex", price: 20000},
    {name: "Hublot", price: 15000},
    {name: "Richard Mille", price: 300000},
];
app.get('/', (req, res) => {
    let items = req.session.cart ? req.session.cart.length : 0;
    res.render('index', {products, items});
});
app.get('/cart', (req, res) => {
    let items = req.session.cart ? req.session.cart.length : 0;
    res.render('cart', {products, items});
});
app.get('/remove/:id', (req, res) => {
    let items = req.session.cart || [];
    let id = +(req.params.id);
});
app.get('/add/:id', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(products[+(req.params.id)]);
    res.redirect('/');
});
app.get('/readSession', (req, res) => {
   res.json(req.session);
});
app.listen(1000, () => {
    console.log("Listening on port 1000...");
});