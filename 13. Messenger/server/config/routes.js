const controllers = require('../controllers');
const authMiddleware = require('./auth');

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.get('/users/register', controllers.auth.registerGet);
  app.post('/users/register', controllers.auth.registerPost);
  app.get('/users/login', controllers.auth.loginGet);
  app.post('/users/login', controllers.auth.loginPost);
  app.get('/users/logout', controllers.auth.logout);

  app.post('/threads/find', authMiddleware.isAuthenticated, controllers.thread.findThread);
  app.get('/thread/:username', authMiddleware.isAuthenticated, controllers.thread.openThread);
  app.post('/thread/:username', authMiddleware.isAuthenticated, controllers.thread.sendMessage);
  app.post('/block/:username', authMiddleware.isAuthenticated, controllers.thread.blockUser);
  app.post('/unblock/:username', authMiddleware.isAuthenticated, controllers.thread.unblockUser);
  app.post('/threads/remove/:id', authMiddleware.isInRole('Admin'), controllers.thread.removeThread);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  })
};
