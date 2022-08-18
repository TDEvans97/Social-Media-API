const { User, Thought } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("__v")
            .populate("thoughts") // path it to user.thoughts? drill in
            .populate("friends")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Failed to find a thought. No thoughts associated with this ID" })
                    : res.json(thought)
            )
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => User.findOneAndUpdate(
                // Pushes the created thought's _id to the associated user's thoughts array field
                { username: req.body.username },
                { $addToSet: { thoughts: _id } },
                { new: true }
            ))
            .then((user) =>
                !user
                    ? res.status(400).json({ message: "Failed to create a thought on this user ID" })
                    : res.json(user)
            )
            .catch((err) => res.json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }, 
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Failed to update thoughts. No thoughts associated with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Failed to delete a thought. No thoughts associated with this ID" })
                    : User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true })
            )
            .then(() => res.json({ message: "The thought has been deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Failed to add a reaction to the thought." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Failed to remove a reaction from the thought." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};