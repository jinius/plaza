"use strict";

var PostManager = function(db) {
	this.db = db.master;
}

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

	this.db.collection("posts", function(err, collection) {
		if (err) return callback(err);

		collection.insert( post, function(err, result) {
			if (err) return callback(err);

			callback(null, post._id);
		});
	});
};

exports.PostManager = PostManager;

