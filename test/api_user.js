"use strict";

var should = require("should");
var request = require("supertest");

var db = require("../models/db");
var UserManager = require("../models/user").UserManager;

var userManager = new UserManager(db);

describe("[api] Authentication", function() {
	var url = "http://localhost:3000";

	describe("/api/user/register", function() {
		var path = "/api/user/register";
		var authKey;

		it("should return authKey", function(done) {
			request(url).post(path)
			.send({ "userId" : "abebcc5e-7693-4860-af00-1c7b83001292" })
			.expect(200)
			.expect("Content-Type", /json/)
			.end(function(err, res) {
				if (err) throw new Error(res.text);

				should.not.exist(res.body.error);
				should.exist(authKey = res.body.authKey);
				done();
			});
		});

		it("should return new authKey with same userId", function(done) {
			request(url).post(path)
			.send({ "userId" : "abebcc5e-7693-4860-af00-1c7b83001292" })
			.expect(200)
			.expect("Content-Type", /json/)
			.end(function(err, res) {
				if (err) throw new Error(res.text);

				should.not.exist(res.body.error);
				should.notEqual(res.body.authKey, authKey);
				should.exist(res.body.authKey);
				done();
			});
		});

		it("should return error with missing userId", function(done) {
			request(url).post(path)
			.send({})
			.expect(400)
			.end(done);
		});

		it("should return error with no data", function(done) {
			request(url).post(path)
			.expect(400)
			.end(done);
		});

		it("should reject request when too much request received from single ip");
	});
});

