"use strict";

var UserManager = function(db) {
	this.db = db.master;
}

// --------------------------------
// Register user or modify pen name
//
// Params :
//	user = { "userId" : "user id" },
//	callback = function(err, _id)
// --------------------------------
UserManager.prototype.addUser = function(user, callback) {
	console.log("addUser: ", user);
	if (! user.userId) return callback(new Error("userId not specified"));

	this.db.collection("users", function(err, collection) {
		if (err) return callback(err);

		collection.insert( user, function(err, result) {
			if (err) return callback(err);

			callback(null, user._id);
		});
	});
};

exports.UserManager = UserManager;

