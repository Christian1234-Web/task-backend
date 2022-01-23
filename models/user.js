const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,

        require: true
    },
    email: {
        type: String,

        require: true
    },
    password: {
        type: String,

        require: true
    },
    image: {
        type: String,

        require: false
    },
   
    is_admin: {
        type: Boolean,

        default: false
    },
    is_client: {
        type: Boolean,

        default: false
    },
    active: {
        type: Boolean,

        default: false
    }

},
    {
        timestamps: true
    });

const User = mongoose.model("users", userSchema);
module.exports = User;