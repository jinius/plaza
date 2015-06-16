"use strict";

var db = require('../models/db');
var UserManager = require('../models/user').UserManager;

var userManager = new UserManager(db);

exports.register = function(req, res) {
	var body = req.body;
	console.log("Register :", typeof body, body);

	if (! body.userId) {
		return res.status(400).json({ "error": "userId was not defined" });
	}

	userManager.addUser( {
		"userId" : body.userId
	}, function(err, _id) {
		if (err) return res.json({ "error": error.message });

		res.json({ "error": null, "authKey": _id });
	});
};

