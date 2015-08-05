"use strict";

var should = require("should");
var ObjectID = require("mongodb").ObjectID;

var db = require("../models/db");
var UserManager = require("../models/user").UserManager;

var userManager = new UserManager(db);

describe("UserManager test", function() {
	beforeEach(function(done) {
		db.master.dropCollection("users", done);
	});

	it("add user", function(done) {
		// User Manager : Add new user
		var user = { "userId" : "add user test" };
		userManager.addUser(user, function(err, _id) {
			// DB : Find the user
			if (err) return done(err);
			var query = { "_id" : new ObjectID(_id) };
			db.master.findOne("users", query, function(err, result) {
				// Compare _id
				if (err) return done(err);
				should.equal(result._id.toString(), _id.toString());
				done();
			});
		});
	});

	it("get user", function(done) {
		// DB : Add new user
		var user1 = { "userId" : "get user test" };
		db.master.insertOne("users", user1, function(err, result) {
			// User Manager : Find the user
			if (err) return done(err);
			userManager.getUser(user1._id, function(err, user2) {
				// Compare _id
				if (err) return done(err);
				should.equal(user1._id.toString(), user2._id.toString());
				done();
			});
		});
	});

	it("remove all user", function(done) {
		var user = { "userId" : "get user test" };
		// DB : Add new user
		db.master.insertOne("users", user, function(err, result) {
			// User Manager : Remove all user
			if (err) return done(err);
			userManager.removeAllUser(function(err) {
				// DB : Find the user
				var query = { "_id" : new ObjectID(user._id) };
				db.master.findOne("users", query, function(err, result) {
					should.not.exist(result);
					done();
				});
			});
		});
	});

	it("remove all user when empty", function(done) {
		userManager.removeAllUser(done);
	});
});

