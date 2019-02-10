const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);

    app.get('/teams/create', restrictedPages.hasRole('Admin'), controllers.team.createGet);
    app.post('/teams/create', restrictedPages.hasRole('Admin'), controllers.team.createPost);
    app.get('/projects/create', restrictedPages.hasRole('Admin'), controllers.project.createGet);
    app.post('/projects/create', restrictedPages.hasRole('Admin'), controllers.project.createPost);
    app.get('/teams/admins', restrictedPages.hasRole('Admin'), controllers.team.getAllAdmin);
    app.post('/teams/admins', restrictedPages.hasRole('Admin'), controllers.team.postAllAdmin);
    app.get('/teams/users', restrictedPages.isAuthed, controllers.team.getAllUser);

    app.get('/projects/admins', restrictedPages.hasRole('Admin'), controllers.project.getAllAdmin);
    app.post('/projects/admins', restrictedPages.hasRole('Admin'), controllers.project.postAllAdmin);
    app.get('/projects/users', restrictedPages.isAuthed, controllers.project.getAllUser);
    app.get('/my-profile', restrictedPages.isAuthed, controllers.home.getMyProfile);

    app.post('/teams/leave/:id', restrictedPages.isAuthed, controllers.home.leaveTeam);
    app.get('/teams/search', restrictedPages.isAuthed, controllers.team.search);
    app.get('/projects/search', restrictedPages.isAuthed, controllers.project.search);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};