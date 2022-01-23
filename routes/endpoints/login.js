const User = require("../../models/user");


let routes = (app) => {
	// login a user
	app.post("/login", async (req, res) => {
		try {
			let { email, password } = req.body;
			let user = await User.findOne({ email, password });
			if (!user) return res.json({ status: "error", error: "Invalid username or password" });
			user.active = "true"
			await user.save();
			res.json({ status: "ok", data: user })

		}
		catch (err) {
			res.status(500).send(err);
		}
		// res.json({status:"ok"})
	});

	// logout a user
	app.put("/logout/:id", async (req, res) => {
		try {
			let user = await user.updateOne({ _id: req.params.id }, req.body);
			if (!user) return res.json({ status: "error", error: "You can not logout twice" });
			console.log("successfully logged out");
			res.json({ status: "ok", data: user });
			// await user.save();

		}
		catch (err) {
			console.log("operation was not successful")
			res.status(500).send(err)
		}
		// throw error
		// res.json({ status: "ok" });
	});

	//get logged user
	app.get("/logins", async (req, res) => {
		try {
			let login = await Login.find();
			res.json(login);

		}
		catch (err) {
			res.status(500).send(err);
		}
	});

	// DELETE A LOGGED USER
	app.delete("/logins/:id", async (req, res) => {
		try {
			let login = await Login.deleteOne({ _id: req.params.id });
			res.json(login);

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

};
module.exports = routes;