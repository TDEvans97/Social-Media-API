// Schema and model from mongoose
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // insert more objects here 
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
    },
    {
        // toJSON use virtuals to true
    }
);

// set up virtual for friendCount

// set up model

// export model