const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
let products = [
    {
       name: 'Orange',
        price: '2'
    },
    {
        name: 'Banana',
        price: '3.6'
    },
    {
        name: 'Apple',
        price: '1.75'
    },
    {
        name: 'Strawberry',
        price: '2.45'
    }
];
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.use(cookieParser());
app.use(bodyparser());
app.use(session({
    secret: 'my secret'
}));
app.get('/', (req, res) => {
   if (req.session.user === undefined){
      res.redirect('/login');
      return;
   }
   let allSum = 0;
   if (req.session.cart !== undefined){
       allSum = req.session.cart
           .map(x => x.price)
           .map(x => Number(x))
           .reduce((a, b) => a + b);
   }
   res.render('index', {products, allSum});
});
app.get('/setCookie', (req, res) => {
   req.session.message = 'hi session';
   res.write('Session set!');
   res.end();
});

app.get('/readCookie', (req, res) => {
   res.json(req.session);
});
app.get('/count', (req, res) => {
   let count = req.session.count || 0;
   req.session.count = Number(count) + 1;
   res.redirect('/');
   res.end();
});
app.get('/cart', (req, res) => {
   res.json(req.session.cart);
});
app.get('/add/:id', (req, res) => {
   if (req.session.cart === undefined){
      req.session.cart = [];
   }
   let id = req.params.id;
   req.session.cart.push(products[id]);
   res.redirect('/');
});
app.get('/remove/:id', (req, res) => {
    if (req.session.cart === undefined){
        req.session.cart = [];
    }
    let id = req.params.id;
    req.session.cart = req.session.cart.filter((x, i) => i != id);
    res.redirect('/');
});
app.get('/login', (req, res) => {
   let user = req.session.user || null;
   res.render('login', {user});
});
app.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    req.session.user = user;
    res.redirect('/');
});
app.listen(5000, () => {
   console.log('Listening on port 5000...')
});