const User = require("../../models/user");
const mailgun = require("mailgun-js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const DOMAIN = 'sandboxf848c289f9514cfb99af354e356a917d.mailgun.org';

const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const routes = (app) => {

    // create a user
    app.post("/user", async (req, res) => {
        let { password, email, name, phone } = req.body;
        if (!name || typeof name !== "string") {
            return res.json({ status: "error", error: "Invalid Username" })
        }
        if (!password || !name || !email || !phone) {
            return res.json({ status: "error", error: "Fill in your Details" })
        }
        if (!password || typeof password !== "string") {
            return res.json({ status: "error", error: "Invalid Password" })
        }
        if (password.length < 6) {
            return res.json({ status: "error", error: " Password length too short, should be at least  6 character" })
        }

        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ error: "User with this email already exists." });
            }
        });

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: "20m" })

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ugwuebukalast@gmail.com",
                pass: "ebuka100"
            },
            tls: {
                rejectUnauthorized: false
            },
        });

        let mailOptions = {
            from: "noreply@gmail.com",
            to: email,
            subject: "Activate Account",
            text: "please click link to activate your account",
            html: `<a href="http://localhost:3000/activate/account/${token}">${process.env.CLIENT_URL}/authentication/activate${token}click me</a>`
        }
        transporter.sendMail(mailOptions, function (error, success) {
            if (error) {
                return res.json({
                    error: error.massage
                })
            }
            return res.json({
                error: "Email has been sent, kindly activate your account",
                key:token
            })
        });

    });

    //second
    app.post("/activate-account", async (req, res) => {
        const { token } = req.body;
        if (token) {
            jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function (err, decodedToken) {
                if (err) {
                    return res.status(400).json({ error: "Incorrect or Expired Link" });
                }
                const { name, email, password } = decodedToken;
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        return res.status(400).json({ error: "User with this email already exists." });
                    }
                    let newUser = new User({ name, email, password });
                    newUser.save((err, success) => {
                        if (err) {
                            console.log("error in account activation: ", err)
                            return res.status(400), json({ error: "error  activating account: ", err });
                        }
                        res.json({
                            massage: "Signup successful"
                        })
                    })
                });
            })
        } else {
            return res.json({ error: "Something went wrong!!!!" })
        }
    });

    app.post("/login", async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await User.findOne({ email, password });
            if (!user) return res.json({ status: "error", error: "Invalid username or password" });
            user.active = req.body.active;
            await user.save();
            res.json({ status: "ok", data: user })

        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    // logout a user
    app.put("/logout/:id", async (req, res) => {
        try {
            let user = await User.updateOne({ _id: req.params.id }, req.body);
            if (!user) return res.json({ status: "error", error: "You can not logout twice" });
            await user.save();
            console.log("successfully logged out");
            res.json({ status: "ok", data: user });
        }
        catch (err) {
            console.log("operation was not successful")
            res.status(500).send(err)
        }
    });

    // get users
    app.get("/user", async (req, res) => {
        try {
            let user = await User.find();
            res.json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    app.put("/user/:id", async (req, res) => {
        try {
            let user = await User.updateOne({ _id: req.params.id }, req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete("/user/:id", async (req, res) => {
        try {
            let user = await User.findByIdAndDelete({ _id: req.params.id });
            res.json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
};
module.exports = routes;