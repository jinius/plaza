"use strict";

var should = require("should");
var request = require("supertest");

var db = require("../models/db");
var UserManager = require("../models/user").UserManager;
var PostManager = require("../models/post").PostManager;

var userManager = new UserManager(db);
var postManager = new PostManager(db);

describe("[api] Post", function() {
	var url = "http://localhost:3000";
	var authKey;

	before(function(done) {
		// Make a user with given authKey
		var user = { "userId" : "Alice" };
		userManager.addUser(user, function(err, _id) {
			// Save the authKey for test
			authKey = _id;
			done(err);
		});
	});

	after(function(done) {
		userManager.removeAllUser(done);
	});

	describe("/api/post", function() {
		var path = "/api/post";
		var samplePost = {
			"title" : "Sample Title",
			"contents" : "Sample Contents"
		};

		it("should accept new post with sufficient information", function(done) {
			request(url).post(path)
			.set("Authorization", authKey)
			.send(samplePost)
			.expect(200)
			.end(function(err, res) {
				if (err) err = new Error(res.text);
				done(err);
			});
		});

		it("should return error with title only", function(done) {
			var onlyTitle = {
				"title" : samplePost.title
			};
			request(url).post(path)
			.send(onlyTitle)
			.expect(400)
			.end(done);
		});

		it("should return error with null title", function(done) {
			var contentsOnly = {
				"title" : null,
				"contents" : samplePost.contents
			};
			request(url).post(path)
			.send(contentsOnly)
			.expect(400)
			.end(done);
		});

		it("should return error with no authKey", function(done) {
			request(url).post(path)
			.send(samplePost)
			.expect(401)
			.end(function(err, res) {
				if (err) err = new Error(res.text);
				done(err);
			});
		});

		it("should return error with invalid authKey", function(done) {
			request(url).post(path)
			.send(samplePost)
			.expect(401)
			.end(function(err, res) {
				if (err) err = new Error(res.text);
				done(err);
			});
		});

		// 2. Modify the post.
		it("should modify new post with sufficient information");
		it("should modify title with title only");
		it("should modify contetns with contents only");
		it("should return error with no update information");
		it("should return error with no authKey");
		it("should return error with invalid authKey");
		it("should return error with another authKey");

		// 3. Delete the post.
		// 4. negative tests : post without authKey or post with wrong key
	});
});

