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

	this.db.collection("users", function(err, collection) {
		if (err) return callback(err);

		collection.insert(user, function(err, result) {
			if (err) return callback(err);

			callback(null, user._id);
		});
	});
};

UserManager.prototype.getUser = function(authKey, callback) {
	if (! authKey) return callback(new Error("authKey not specified"));

	this.db.collection("users", function(err, collection) {
		if (err) return callback(err);

		collection.findOne({
			"_id" : ObjectID(authKey)
		}, function(err, result) {
			if (err) return callback(err);

			callback(null, result);
		});
	});
};

UserManager.prototype.removeAllUser = function(callback) {
	this.db.collection("users", function(err, collection) {
		if (err) return callback(err);
		collection.drop(function(err) {
			if (err && err.message == "ns not found") return callback();
			callback(err);
		});
	});
};

exports.UserManager = UserManager;

