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
		db.master.insertOne("test", {"test" : "test"}, done);
	});

	it("findOne", function(done) {
		db.master.findOne("test", {"test" : "test"}, done);
	});

	it("drop collection", function(done) {
		db.master.dropCollection("test", done);
	});
});

