const Order = require("../../models/order");

const routes = (app) => {

    app.post("/order", async (req, res) => {
        try {
            let order = new Order(req.body);
            await order.save();
            res.json(order);
        }

        catch (err) {
            res.status(500).send(err);

        }
    });

    app.get("/order", async (req, res) => {
        try {
            let order = await Order.find()
                .populate("product_id")
                .populate("user_id");

            res.json(order);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
    app.get("/order/:id", async (req, res) => {
        try {
            let order = await Order.find({ _id: req.params.id })
                .populate("product_id")
                .populate("user_id");
            res.json(order);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.put("/order/:id", async (req, res) => {
        try {
            let order = await Order.updateOne({ _id: req.params.id }, (req.body));
            res.json(order);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.delete("/order/:id", async (req, res) => {
        try {
            let order = await Order.deleteOne({ _id: req.params.id });
            res.json(order);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
module.exports = routes;