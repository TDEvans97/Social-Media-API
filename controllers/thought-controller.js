const { User, Thought } = require("../models");

module.exports = {
    getThoughts(req, res) { },
    getSingleThought(req, res) { },
    createThought(req, res) { },
    updateThought(req, res) { },
    deleteThought(req, res) { },
    addReaction(req, res) { },
    removeReaction(req, res) { },
};

// get all thoughts
// Thought.find

// get single thought by id
// Thought.findone

// create a thought
// Thought.create

// update a thought
// Thought.findOneAndUpdate

// delete a thought also need to do a findOneAndUpdate on the user to remove the thought from the user's thoughts array
// Thought.findOneAndRemove
// also need User.findOneAndUpdate -use $pull to pull the thought from user's thought's array

// add a reaction to a thought
// Thought.findOneAndUpdate
// use $addToSet

// remove reaction from a thought
// Thought.findOneAndUpdate
// use $pull to pull reaction from thought's reaction array

// export your thoughtController