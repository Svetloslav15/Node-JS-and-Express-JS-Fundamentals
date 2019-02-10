const Team = require('mongoose').model('Team');
const Project = require('mongoose').model('Project');
const User = require('mongoose').model('User');

module.exports = {
    createGet: (req, res) => {
        res.render('projects/create');
    },
    createPost: (req, res) => {
        let projectName = req.body.name;
        let projectDescription = req.body.description;
        if (projectName.trim() === "" || projectDescription.trim() === "") {
            res.locals.globalError = 'Fields is required!';
            res.render('projects/create');
            return;
        }
        Project.create({
            name: projectName,
            description: projectDescription
        }).then((project) => {
            res.redirect('/projects/admins');
        }).catch(err => {
            res.locals.globalError = err;
            res.render('projects/create');
        })
    },
    getAllAdmin: async (req, res) => {
        try {
            let projects = await Project.find();
            let teams = await Team.find();
            res.render('projects/projects-admin', {projects, teams});
        }
        catch (err) {
            console.log(err);
            res.redirect('/projects/admins');
        }
    },
    postAllAdmin: async (req, res) => {
        let projectId = req.body.project;
        let teamId = req.body.team;

        try {
            let project = await Project.findById(projectId);
            project.team = teamId;
            project.save();

            let team = await Team.findById(teamId);
            team.projects.push(projectId);
            team.save();
            res.redirect('/projects/admins');
        }
        catch (err) {
            console.log(err);
            res.redirect('/projects/admins');
        }
    },
    getAllUser: async (req, res) => {
        try {
            let projects = await Project.find({})
                .populate('team');
            res.render('projects/projects-users', {projects});
        }
        catch (err){
            console.log(err);
            res.redirect('/projects/admins');
        }
    },
    search: async (req, res) => {
        const query = req.query.query;

        Project.find({ })
            .populate('team')
            .then((projects) => {
                const filteredProjects = projects.filter((a) => {
                    return a.name.toLowerCase().includes(query.toLowerCase());
                });
                res.render('projects/projects-users', {projects: filteredProjects});
            })
            .catch(console.error);
    }
};