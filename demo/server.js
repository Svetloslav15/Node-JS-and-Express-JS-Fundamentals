const app = require('express')();
const port = 3333;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const encryption = require('./encryption');
const passport = require('passport');

let products = [
    {
       name: 'Apple', price: 2.3
    },
    {
        name: 'Orange', price: 4.4
    },
    {
        name: 'Bannana', price: 3.6
    },
    {
        name: 'Kiwi', price: 1.8
    },
];
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(cookieParser());
app.use(session({secret: 'demo $$$'}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.render('index', {products});
});
app.get('/login', (req, res) => {
   res.render('log-in');
});
app.post('/login', (req, res) => {
   let {username, password} = req.body;
   if (username == "pesho" && password == '123')
   {
       let salt = encryption.generateSalt();
       let hashedPass = encryption.generateHashedPassword(salt, password);

       req.session.user = {
           username,
           salt,
           hashedPass
       };
       res.redirect('/');
   }
   res.redirect('/login');
});
app.get('/add/:id', (req, res) => {
   if (req.session.cart === undefined){
      req.session.cart = [];
   }
    let product = products[+req.params.id];
   req.session.cart.push(product);
   res.redirect('/');
});
app.get('/cart', (req, res) => {
   res.json(req.session.cart);
});
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});