const Product = require("../../models/product");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getMilliseconds() + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('image');
const routes = (app) => {

    app.post("/product", async (req, res) => {
        let { name, category, description, price, image, quantity, color, size } = req.body;
        // console.log(req.body);
        // if (!name || !category || !description || !price || !image || !quantity || !color || !size) {
        //     return res.json({ status: "error", error: "please fill out the require fields" });
        // }
        upload(req, res, async (err) => {
            // console.log("upload",req);
            if (err) {
                console.log(err);
            } else {
                if (req.file) {
                    console.log("hi", req.file);    
                    req.body.image = '/' + req.file.path;
                    try {
                        let product = new Product(req.body);
                        await product.save();
                        res.json(product);
                    }

                    catch (err) {
                        res.status(500).send(err);

                    }
                }
            }
        });
    });
    app.get("/product", async (req, res) => {
        try {
            let product = await Product.find();
            res.json(product);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.get("/product/:id", async (req, res) => {
        try {
            let product = await Product.find({ _id: req.params.id });
            res.json(product);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.put("/product/:id", async (req, res) => {
        try {
            let product = await Product.updateOne({ _id: req.params.id }, (req.body));
            res.json(product);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.delete("/product/:id", async (req, res) => {
        try {
            let product = await Product.deleteOne({ _id: req.params.id });
            res.json(product);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
module.exports = routes;