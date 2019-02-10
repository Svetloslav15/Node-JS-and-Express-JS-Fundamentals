const Team = require('mongoose').model('Team');
const Project = require('mongoose').model('Project');
const User = require('mongoose').model('User');

module.exports = {
    createGet: (req, res) => {
        res.render('teams/create');
    },
    createPost: (req, res) => {
        let teamName = req.body.name;
        if (teamName.trim() === ""){
            res.locals.globalError = 'Name is required!';
            res.render('teams/create');
            return;
        }
        Team.create({
            name: teamName,
            projects: [],
            members: []
        }).then((team) => {
            res.redirect('/teams/admins');
        }).catch(err => {
            res.locals.globalError = err;
            res.render('teams/create');
        })
    },
    getAllAdmin: async (req, res) => {
        try{
            let users = await User.find();
            let teams = await Team.find();
            res.render('teams/teams-admin', {users, teams});
        }
        catch(err){
            console.log(err);
            res.redirect('/teams/admins');
        }
    },
    postAllAdmin: async (req, res) => {
        let userId = req.body.user;
        let teamId = req.body.team;

        try {
            let user = await User.findById(userId);
            user.teams.push(teamId);
            user.save();

            let team = await Team.findById(teamId);
            team.members.push(userId);
            team.save();
            res.redirect('/teams/admins');
        }
        catch(err){
            console.log(err);
            res.redirect('/teams/admin');
        }
    },
    getAllUser: async (req, res) => {
        let teams = await Team.find()
            .populate('projects')
            .populate('members');

        res.render('teams/teams-user', {teams});
    },
    search: (req, res) => {
        const query = req.query.query;

        Team.find({ })
            .populate('projects')
            .populate('members')
            .then((projects) => {
                const filteredTeams = projects.filter((a) => {
                    return a.name.toLowerCase().includes(query.toLowerCase());
                });
                res.render('teams/teams-user', {teams: filteredTeams});
            })
            .catch(console.error);
    }
};