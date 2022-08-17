// Schema and model from mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: dateFormat(Date.now),
            // getter method
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

// virtual for reaction Count
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// set up model
const Thought = model("Thought", thoughtSchema);

// export model
module.exports = Thought;