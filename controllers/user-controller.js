const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {},
    getSingleUser(req, res) {},
    createUser(req, res) { },
    updateUser(req, res) { },
    deleteUser(req, res) { },
    addFriend(req, res) { },
    removeFriend(req, res) {},
};

// User.find
// activity 13 in server.js- reference

// get single user by id
// User.findOne
// populate 'friends' to get friend data
// populate ' thoughts' to get thought data.

// create a new user
// User.create

// update a user
// User.findOneAndUpdate
//$set -set the req.body

// add friend to friend list
// User.findOneAndUpdate
// $addToSet to add the new friend to the user's friend list

// remove friend from friend list
// User.findOneAndUpdate
