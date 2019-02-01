const Article = require('../models/Article');
const User = require('../models/User');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        let articleBody = req.body;
        if (!articleBody.title.trim() || !articleBody.content.trim()){
            articleBody.error = 'Fields are required!';
            res.render('article/create', articleBody);
            return;
        }
        Article.create({
            title: articleBody.title,
            content: articleBody.content,
            author: req.user,
            date: new Date(),
        }).then((article) => {
            res.redirect('/');
        }).catch(console.error);
    },
    editGet: async (req, res) => {
        let id = req.params.id;
        let article = await Article.findById(id);
        res.render('article/edit', article);
    },
    editPost: (req, res) => {
        let id = req.params.id;
        let articleBody = req.body;
        if (!articleBody.title.trim() || !articleBody.title.trim()){
            articleBody.error = 'Fields are required!';
            res.render('article/edit', articleBody);
        }
        Article.findByIdAndUpdate(id, {
            $set: {
                title: articleBody.title,
                content: articleBody.content
            }
        }).then(() => {
                res.redirect('/');
            });
    },
    deleteGet: async (req, res) => {
        let id = req.params.id;
        let article = await Article.findById(id);
        res.render('article/delete', article);
    },
    deletePost: (req, res) => {
        let id = req.params.id;
        Article.findByIdAndRemove(id)
            .then(() => {
                res.redirect('/');
            });
    },
    detailsGet: async (req, res) => {
        let id = req.params.id;
        let article = await Article.findById(id);
        let user = await User.findById(article.author);
        article.author = user;
        let isAuthorized = (req.user._id.toString().trim() == user._id.toString().trim()) || req.user.roles.includes('Admin');
        res.locals.IsAuthorized = isAuthorized;
        res.render('article/details', article)
    }
};