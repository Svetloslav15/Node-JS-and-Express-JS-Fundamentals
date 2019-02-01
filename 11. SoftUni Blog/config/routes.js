const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');
const restrictPage = require('../config/auth');

module.exports = (app) => {
    app.get('/', homeController.index);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/logout', userController.logout);

    app.get('/article/create', restrictPage.isAuthed, articleController.createGet);
    app.post('/article/create', restrictPage.isAuthed, articleController.createPost);
    app.get('/article/edit/:id', restrictPage.isAuthed, articleController.editGet);
    app.post('/article/edit/:id', restrictPage.isAuthed, articleController.editPost);
    app.get('/article/delete/:id', restrictPage.isAuthed, articleController.deleteGet);
    app.post('/article/delete/:id', restrictPage.isAuthed, articleController.deletePost);
    app.get('/article/details/:id', restrictPage.isAuthed, articleController.detailsGet);
};

