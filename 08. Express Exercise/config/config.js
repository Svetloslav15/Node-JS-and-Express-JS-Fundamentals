module.exports = {
    development: {
        port: process.env.PORT || 4000,
        dbPath: 'mongodb://localhost:27017/rubiks-db'
    },
    production: {}
};