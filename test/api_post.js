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
	var postId;

	before(function(done) {
		// Make a user with given authKey
		var user = { "userId" : "Alice" };
		var post = {
			"writerId" : "Sample Writer id",
			"title" : "Sample Title",
			"contents" : "Sample Contents"
		};

		userManager.addUser(user, function(err, _id) {
			if (err) return done(err);
			// Save the authKey for test
			authKey = _id.toString();
			postManager.addPost(post, function(err, _id) {
				// Save the postId for test
				postId = _id.toString();
				done(err);
			});
		});
	});

	after(function(done) {
		userManager.removeAllUser(function(err) {
			if (err) return done(err);
			postManager.removeAllPost(done);
		});
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
			.expect(201)
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

		// Get a post / Get posts.
		it("should return a post", function(done) {
			request(url).get(path + "/" + postId)
			.expect(200)
			.expect("Content-Type", /json/)
			.end(function(err, res) {
				if (err) return done(new Error(res.text));

				should.not.exist(res.body.error);
				var post = res.body.post;
				should.exist(post);
				if (post) {
					should.not.exist(post.writerId);
					should.exist(post.title);
					should.exist(post.contents);
				}
				done();
			});
		});

		it("should return user's 10 posts", function(done) {
			var posts = [];
			for (var i = 0; i < 15; ++i) {
				posts.push({
					"writerId" : authKey,
					"title" : "title1 " + i,
					"contents" : "contents1 " + i
				});
			}
			db.master.insertMany("posts", posts, function(err, result) {
				if (err) return done(err);
				request(url).get(path)
				.set("Authorization", authKey)
				.expect(200)
				.expect("Content-Type", /json/)
				.end(function(err, res) {
					if (err) return done(new Error(res.text));
					should.not.exist(res.body.error);
					var posts = res.body.posts;
					should.exist(posts);
					if (posts) {
						should.equal(posts.length, 10);
						posts.forEach(function(post) {
							should.not.exist(post.writerId);
							should.exist(post.title);
							should.exist(post.contents);
						});
					}
					done();
				});
			});
		});

		// Modify the post.
		it("should modify new post with sufficient information");
		it("should modify title with title only");
		it("should modify contetns with contents only");
		it("should return error with no update information");
		it("should return error with no authKey");
		it("should return error with invalid authKey");
		it("should return error with another authKey");

		// Delete the post.
	});
});

