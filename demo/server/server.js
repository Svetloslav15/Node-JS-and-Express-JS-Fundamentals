const express = require('express');
const bodyparser = require('body-parser');
const authRouter = require('./api/routes/auth');
const mongoose = require('mongoose');
const productSchema = require('./api/models/product');
const Product = mongoose.model('Product', productSchema);
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

mongoose.connect("mongodb://localhost/demo");
const port = 6001;
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use('/auth', authRouter);

app.get('/products/:id', (req, res) => {
   let id = req.params.id;
    res.send(id);
});
app.post('/products/add', upload.single('productImage'), (req, res) =>{
    let product = new Product({
       _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    console.log(req.file);
    product.save();
});
app.get('*', (req, res) => {
   res.send('Error: 404 Not Found!');
});
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});