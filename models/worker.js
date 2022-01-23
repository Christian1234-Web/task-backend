const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({
    name: {
        type: String,

        require: true
    },
    salary: {
        type: Number,

        require: true
    },
    position: {
        type: String,

        require: true
    },
    is_present: {
        type: Boolean,

        default: false
    }
},
    {
        timestamps: true
    }
);

const Worker = mongoose.model("workers", workerSchema);
module.exports = Worker;
