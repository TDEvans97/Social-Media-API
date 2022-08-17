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
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address."]
        },
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
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

// set up virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// set up model
const User = model('User', userSchema);

// export model
module.exports = User;