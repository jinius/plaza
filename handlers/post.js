"use strict";

var db = require("../models/db");
var UserManager = require("../models/user").UserManager;
var PostManager = require("../models/post").PostManager;

var userManager = new UserManager(db);
var postManager = new PostManager(db);

exports.create = function(req, res) {
	var body = req.body || {};
	console.log();
	console.log("Add Post :", typeof body, body);
	if (! body.title) return res.status(400).json({ "error": "no title" });
	if (! body.contents) return res.status(400).json({ "error": "no contents" });

	console.log("with Authorization :", req.get("Authorization"));
	userManager.getUser(req.get("Authorization"), function(err, user) {
		// Check authorization
		if (err) return res.status(401).json({ "error": err.message });
		if (! user) return res.status(401).json({ "error": "Authorization - user not found" });

		var post = {
			"writerId" : user._id,
			"title" : req.body.title,
			"contents" : req.body.contents
		};
		postManager.addPost(post, function(err, _id) {
			if (err) return res.status(500).json({ "error": err.message });
			res.status(201).json({ "error": null, "postId": _id });
		});
	});
};

exports.read = function(req, res) {
	var _id = req.params._id;
	console.log();
	console.log("Read Post :", _id);
	if (! _id) return res.status(400).json({ "error": "post id not specified" });

	postManager.getPost(_id, function(err, post) {
		if (err) return res.status(500).json({ "error": err.message });
		res.json({ "error": null, "post" : { "title" : post.title, "contents" : post.contents } });
	});
};

exports.readByWriterId = function(req, res) {
	console.log();
	console.log("Get Posts with Authorization :", req.get("Authorization"));
	userManager.getUser(req.get("Authorization"), function(err, user) {
		// Check authorization
		if (err) return res.status(401).json({ "error": err.message });
		if (! user) return res.status(401).json({ "error": "Authorization - user not found" });

		postManager.getPostsByWriterId(user._id, 10, function(err, posts) {
			if (err) return res.status(500).json({ "error": err.message });
			var result = [];
			posts.forEach(function(post) {
				result.push({
					"_id" : post._id.toString(),
					"title" : post.title,
					"contents" : post.contents
				});
			});
			console.log(result);
			res.json({ "error": null, "posts": result });
		});
	});
};
