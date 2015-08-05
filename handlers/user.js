"use strict";

var db = require('../models/db');
var UserManager = require('../models/user').UserManager;

var userManager = new UserManager(db);

exports.register = function(req, res) {
	var body = req.body || {};
	console.log();
	console.log("Register User :", typeof body, body);
	if (! body.userId) return res.status(400).json({ "error": "userId was not defined" });

	var user = { "userId" : body.userId };
	userManager.addUser(user, function(err, _id) {
		if (err) return res.json({ "error": err.message });
		res.json({ "error": null, "authKey": _id });
	});
};

