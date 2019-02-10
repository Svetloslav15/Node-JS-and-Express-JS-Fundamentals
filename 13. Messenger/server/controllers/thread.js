const User = require('mongoose').model('User');
const Thread = require('mongoose').model('Thread');
const Message = require('mongoose').model('Message');

module.exports = {
    findThread: async (req, res) => {
        let otherUsername = req.body.username;
        let currentUsername = req.user.username;
        let currUser = await User.findOne({username: currentUsername});
        let otherUser = await User.findOne({username: otherUsername});
        let thread = await Thread.findOne({
            users: {
                $all: [currUser._id, otherUser._id]
            }
        });
        if (!thread){
           await Thread.create({
               users: [currUser._id, otherUser._id]
           });
        }
        res.redirect(`/thread/${otherUsername}`);
    },
    openThread: async (req, res) => {
        let userUsername = req.params.username;
        let currUsername = req.user.username;
        let currUser = await User.findOne({username: currUsername});
        let otherUser = await User.findOne({username: userUsername});
        let thread = await Thread.findOne({
            users: {
                $all: [currUser._id, otherUser._id]
            }
        });
        let messages = await Message.find({
            thread: thread._id
        });
        messages.forEach(x => {

            if (x.user.toString() === req.user._id.toString()){
               x.isMine = true;
           }
        });
        let isBlocked = false;
        if (req.user.blockedUsers.includes(otherUser.username)) {
            isBlocked = true;
        }
        res.render('home/chatroom', {username: userUsername, messages, threadId: thread._id, isBlocked});
    },
    sendMessage: async (req, res) => {
        let threadId = req.body.threadId;
        let otherUsername = req.params.username;
        let message = req.body.message;
        Message.create({
            content: message,
            user: req.user._id,
            thread: threadId
        }).then(() => {
            res.redirect(`/thread/${otherUsername}`);
        }).catch(console.error);
    },
    blockUser: async (req, res) => {
        let otherUsername = req.params.username;
        let currUsername = req.user.username;
        req.user.blockedUsers.push(otherUsername);
        await User.findOneAndUpdate({username: currUsername}, {$set:{
                blockedUsers: req.user.blockedUsers
            }});
        res.redirect(`/thread/${otherUsername}`);
    },
    unblockUser: async (req, res) => {
        let otherUsername = req.params.username;
        let currUsername = req.user.username;
        req.user.blockedUsers = req.user.blockedUsers.filter(x => x !== otherUsername);

        await User.findOneAndUpdate({username: currUsername}, {$set:{
                blockedUsers: req.user.blockedUsers
            }});
        res.redirect(`/thread/${otherUsername}`);
    },
    removeThread: (req, res) => {
        let threadId = req.params.id;
        Thread.findByIdAndRemove(threadId)
            .then(() => {
                res.redirect('/');
            }).catch(console.error);
    }
};