const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,

        ref: "products"
    },
    is_paid: {
        type: Boolean,

        default: false
    },

},
    {
        timestamps: true
    });

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;