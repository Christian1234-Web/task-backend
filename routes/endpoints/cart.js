const Cart = require("../../models/cart");

const routes = (app) => {

    app.post("/cart", async (req, res) => {
                    try {
                        let cart = new Cart(req.body);
                        await cart.save();
                        res.json(cart);
                    }

                    catch (err) {
                        res.status(500).send(err);

                    }
    });

    app.get("/cart", async (req, res) => {
        try {
            let cart = await Cart.find()
                .populate("product_id");
            res.json(cart);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
    app.get("/cart/:id", async (req, res) => {
        try {
            let cart = await Cart.find({ _id: req.params.id });
            res.json(cart);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.put("/cart/:id", async (req, res) => {
        try {
            let cart = await Cart.updateOne({ _id: req.params.id }, (req.body));
            res.json(cart);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.delete("/cart/:id", async (req, res) => {
        try {
            let cart = await Cart.deleteOne({ _id: req.params.id });
            res.json(cart);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
module.exports = routes;