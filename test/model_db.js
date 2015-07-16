"use strict";

var should = require("should");

var db = require("../models/db");

describe("DB test", function() {
	it("connect test", function(done) {
		db.master.connect(done);
	});

	it("collection test", function(done) {
		db.master.collection("test", done);
	});

	it("connectionTest test", function(done) {
		db.master.connectionTest(done);
	});

	it("insertOne", function(done) {
		db.master.insertOne("test", {"test" : "one"}, done);
	});

	it("findOne", function(done) {
		db.master.findOne("test", {"test" : "one"}, done);
	});

	it("insertMany", function(done) {
		var elements = [];
		for (var i = 0; i < 20; ++i) {
			elements.push({ "test" : "insertMany", "a" : i });
		}
		db.master.insertMany("test", elements, function(err, result) {
			if (err) return done(err);
			var query = { "test" : "insertMany" };
			db.master.collection("test", function(err, collection) {
				if (err) return done(err);
				collection.find(query).toArray(function(err, docs) {
					if (err) return done(err);
					should.equal(docs.length, 20);
					done();
				});
			});
		});
	});

	it("drop collection", function(done) {
		db.master.dropCollection("test", done);
	});
});

