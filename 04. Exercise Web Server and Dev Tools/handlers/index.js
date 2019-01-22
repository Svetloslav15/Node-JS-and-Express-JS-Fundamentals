const staticFileHandler = require('./static-file-handler');
const homeHandler = require('./home-handler');
const movieHandler = require('./movie-handler');

module.exports = [
    staticFileHandler,
    homeHandler,
    movieHandler
];