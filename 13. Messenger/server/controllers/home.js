const Thread = require('mongoose').model('Thread');

module.exports = {
    index: async (req, res) => {
        let threads = await Thread.find()
            .populate('users');

        res.render('home/index', {threads})
    }
};
