let Cube = require('mongoose').model('Cube');

module.exports = {
    indexGet: (req, res) => {
        Cube.find({})
            .then((cubes) => {
                res.render('index', {cubes});
            });
    },
    createGet: (req, res) => {
        res.render('create');
    },
    createPost: (req, res) => {
        let name = req.body.name;
        let description = req.body.description;
        let difficulty = req.body.difficulty;
        let image = req.body.image;
        let cube = {
            name, description, difficulty, image
        };
        Cube.create(cube)
            .then(() => {
                res.redirect('/');
            });
    },
    aboutGet: (req, res) => {
        res.render('about');
    },
    detailsGet: (req, res) => {
        let id = req.params.id;
        Cube.findById(id)
            .then((cube) => {
                res.render('details', {cube});
            });
    },
    searchGet: (req, res) => {
        let { name, from , to} = req.query;
        from = Number(from);
        to = Number(to);

        let errors = [];
        if (from < 1 || from > 6){
            errors.push('From must be between 1 and 6');
        }
        if (to < 1 || to > 6) {
            errors.push('To must be between 1 and 6');
        }
        if (from > to) {
            errors.push('From must be less than to.');
        }

        if (name && from && to && errors.length === 0){
            Cube.find({})
                .then((cubes) => {
                   cubes = cubes.filter(x => x.name.toLowerCase() === name.toLowerCase() &&
                   +x.difficulty >= from && +x.difficulty <= to);
                   res.render('index', {cubes});
                });
        }
        else{
            res.redirect('/');
        }
    }
};