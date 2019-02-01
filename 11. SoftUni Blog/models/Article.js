const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: {type: mongoose.SchemaTypes.String, required: true},
    content: {type: mongoose.SchemaTypes.String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    date: {type: mongoose.SchemaTypes.Date}
});

let Article = mongoose.model('Article', articleSchema);
module.exports = Article;