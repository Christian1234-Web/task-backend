const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,

        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,

        require: true
    },
    size: {
        type: String,

        require: true
    },
    color: {
        type: String,

        require: true
    },
    price: {
        type: Number,

        require: true
    },
    quantity: {
        type: Number,

        require: true
    },
    image: {
        type: String,

        require: true
    },
},
    {
        timestamps: true
    });
const Product = mongoose.model("products", productSchema);

module.exports = Product;