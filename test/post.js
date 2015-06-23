"use strict";

var should = require("should");
var ObjectID = require("mongodb").ObjectID;

var db = require("../models/db");
var PostManager = require("../models/post").PostManager;

var postManager = new PostManager(db);

describe("PostManager test", function() {
	beforeEach(function(done) {
		db.master.dropCollection("posts", done);
	});

	it("add post", function(done) {
		// Post Manager : Add new post
		var post = {
			"writerId" : "add post writer id",
			"title" : "add post title",
			"contents" : "add post contents"
		};
		postManager.addPost(post, function(err, _id) {
			// DB : Find the post
			if (err) return done(err);
			var query = { "_id" : ObjectID(_id) };
			db.master.findOne("posts", query, function(err, result) {
				// Compare _id
				if (err) return done(err);
				should.equal(result._id.toString(), _id.toString());
				done();
			});
		});
	});

	it("get a post", function(done) {
		// DB : Add new post
		var post1 = {
			"writerId" : "get post writer id",
			"title" : "get post title",
			"contents" : "get post contents"
		};
		db.master.insertOne("posts", post1, function(err, result) {
			// Post Manager : Find the post
			if (err) return done(err);
			postManager.getPost(post1._id.toString(), function(err, post2) {
				// Compare _id
				if (err) return done(err);
				should.equal(post1._id.toString(), post2._id.toString());
				done();
			});
		});
	});

	it("get posts by writer id", function(done) {
		// DB : Add 10 post
		var posts = [];
		for (var i = 0; i < 10; ++i) {
			posts.push({
				"writerId" : "test",
				"title" : "title " + i,
				"contents" : "contents " + i
			});
		}
		db.master.insertMany("posts", posts, function(err, result) {
			if (err) return done(err);
			postManager.getPostsByWriterId("test", 5, function(err, posts) {
				if (err) return done(err);
				should.equal(posts.length, 5);
				done();
			});
		});
	});

	it("modify a post");

	it("remove all post when empty");

	it("remove all post");

});

