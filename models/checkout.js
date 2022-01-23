const mongoose = require("mongoose");

const checkoutSchema = mongoose.Schema({
    cart_id: {
        type: mongoose.Types.ObjectId,

        ref: "carts"
    },
    name: {
        type: String,

        require: true
    },
    phone: {
        type: Number,

        require: true
    },
    email: {
        type: String,

        require: true
    },
    address: {
        type: String,

        require: true
    },
    password: {
        type: String,

        require: true
    },
    price: {
        type: Number,

        require: true
    }

},
    {
        timestamps: true
    });

const Checkout = mongoose.model("checkouts", checkoutSchema);
module.exports = Checkout;