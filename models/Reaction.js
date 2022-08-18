const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            ref: 'user' 
        },
        reactionBody: { 
            type: String, 
            require: true, 
            maxLength: 280 
        },
        username: { type: String, require: true },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

module.exports = reactionSchema;