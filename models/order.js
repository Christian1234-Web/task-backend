const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    cart_id: {
        type: mongoose.Types.ObjectId,

        ref: "carts"
    },
    user_id: {
        type: mongoose.Types.ObjectId,

        ref: "users"
    },
    product_id: {
        type: mongoose.Types.ObjectId,

        ref: "products"
    },
    is_paid: {
        type: Boolean,

        default: true
    },

},
    {
        timestamps: true
    });

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;