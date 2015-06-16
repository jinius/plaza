"use strict";

var should = require("should");

var db = require("../models/db");

describe("DB test", function() {
	it("should connect successfully", function(done) {
		db.master.connectionTest(done);
	});

	it("insert data", function(done) {
		db.master.collection("test", function(err, collection) {
			if (err) return done(err);
			collection.insertOne({"test" : "test"}, done);
		});
	});

	it("drop collection", function(done) {
		db.master.collection("test", function(err, collection) {
			if (err) return done(err);
			collection.drop(done);
		});
	});
});

