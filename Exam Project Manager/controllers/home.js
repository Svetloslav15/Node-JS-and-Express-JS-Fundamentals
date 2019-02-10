const User = require('mongoose').model('User');
const Team = require('mongoose').model('Team');
const Project = require('mongoose').model('Project');

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    getMyProfile: (req, res) => {
        let userId = req.user._id;
        User.findById(userId)
            .populate({
                path: 'teams',
                options: {
                    populate: { path: 'projects' },
                }
            })
            .then((user) => {
                let projects = [];
                if (user.teams[0] != undefined){
                    for (let project of user.teams[0].projects) {
                        projects.push(project);
                    }
                }

                res.render('home/my-profile', {user, projects});
            }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    },
    leaveTeam: async (req, res) => {
        let teamId = req.params.id;
        let userId = req.user._id;
        try {
            let team = await Team.findById(teamId)
                .populate('members');

            team.members = team.members.filter(x => x._id.toString() !== userId.toString());
            team.save();

            let user = await User.findById(userId)
                .populate('teams');

            user.teams = user.teams.filter(x => x._id.toString() !== teamId.toString());
            user.save();
            res.redirect('/my-profile');
        }
        catch (err){
            console.log(err);
            res.redirect('/my-profile')
        }
    }
};