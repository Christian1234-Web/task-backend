const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
    checkout_id: {
        type: mongoose.Types.ObjectId,

        ref: "checkouts"
    },
    driver: {
        type: String,

        require: false
    },

},
    {
        timestamps: true
    });

const Delivery = mongoose.model("deliverys", deliverySchema);
module.exports = Delivery;