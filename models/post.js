"use strict";

var ObjectID = require("mongodb").ObjectID;

var PostManager = function(db) {
	this.db = db.master;
};

// --------------------------------
// Add post
//
// Params :
//	post = { "writerId" : writerId, "title" : title, "contents" : contents },
//	callback = function(err, _id)
// --------------------------------
PostManager.prototype.addPost = function(post, callback) {
	if (! post.writerId) return callback(new Error("writer not specified"));
	if (! post.title) return callback(new Error("title not specified"));
	if (! post.contents) return callback(new Error("contents not specified"));

	this.db.insertOne("posts", post, function(err, result) {
		if (err) return callback(err);
		callback(null, post._id);
	});
};

// --------------------------------
// Get a post
//
// Params :
//	_id = postId
//	callback = function(err, post)
// --------------------------------
PostManager.prototype.getPost = function(_id, callback) {
	if (! _id) return callback(new Error("_id not specified"));

	var query = { "_id" : new ObjectID(_id) };
	this.db.findOne("posts", query, function(err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
};

// --------------------------------
// Get posts by writer id
//
// Params :
//	_id = writerId
//	callback = function(err, posts)
// --------------------------------
PostManager.prototype.getPostsByWriterId = function(_id, count, callback) {
	if (! _id) return callback(new Error("_id not specified"));

	this.db.collection("posts", function(err, collection) {
		if (err) return callback(err);
		var query = { "writerId" : _id };
		collection.find(query).limit(count).toArray(function(err, posts) {
			if (err) return callback(err);
			callback(null, posts);
		});
	});
};

PostManager.prototype.removeAllPost = function(callback) {
	this.db.dropCollection("posts", callback);
};

exports.PostManager = PostManager;

