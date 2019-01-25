const homeController = require('../controllers/homeController');

module.exports = app => {
    app.get('/', homeController.indexGet);
    app.get('/about', homeController.aboutGet);
    app.get('/create', homeController.createGet);
    app.post('/create', homeController.createPost);
    app.get('/details/:id', homeController.detailsGet);
    app.get('/search', homeController.searchGet)
};