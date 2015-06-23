"use strict";

var ObjectID = require("mongodb").ObjectID;

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
	if (! user.userId) return callback(new Error("userId not specified"));

	this.db.insertOne("users", user, function(err, result) {
		if (err) return callback(err);
		callback(null, user._id);
	});
};

UserManager.prototype.getUser = function(authKey, callback) {
	if (! authKey) return callback(new Error("authKey not specified"));

	var query = { "_id" : ObjectID(authKey) };
	this.db.findOne("users", query, function(err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
};

UserManager.prototype.removeAllUser = function(callback) {
	this.db.dropCollection("users", callback);
};

exports.UserManager = UserManager;

