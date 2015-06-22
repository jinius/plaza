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
		// Add new post
		postManager.addPost({
			"writerId" : "add post writer id",
			"title" : "add post title",
			"contents" : "add post contents"
		}, function(err, _id) {
			// Find the post
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

	it("get a post");

	it("get posts");

	it("modify a post");

	it("remove all post when empty");

	it("remove all post");

});

