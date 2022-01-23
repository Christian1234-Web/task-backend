const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema({
    checkout_id: {
        type: mongoose.Types.ObjectId,

        ref: "checkouts"
    },
},
    {
        timestamps: true
    });

const Revenue = mongoose.model("revenues", revenueSchema);
module.exports = Revenue;