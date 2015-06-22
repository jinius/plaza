"use strict";

var MongoClient = require("mongodb").MongoClient;
var config = require("../config").db;

var Db = function(url) {
	if (! url) throw new Error("models/db : DB name not defined");
	this.url = url;
};

// --------------------------------
// Base functions
// --------------------------------
Db.prototype.connect = function(callback) {
	var self = this;
	if (! self.url) callback(new Error("models/db : master DB not defined"));

	if (self.connection)
		return callback(null, self.connection);

	MongoClient.connect(self.url, function(err, connection) {
		if (err) callback(err);
		self.connection = connection;
		callback(null, connection);
	});
};

Db.prototype.collection = function(name, callback) {
	this.connect(function(err, connection) {
		if (err) return callback(err);

		connection.collection(name, function(err, collection) {
			if (err) return callback(err);
			callback(null, collection);
		});
	});
};

Db.prototype.connectionTest = function(callback) {
	this.collection("test", callback);
};

// --------------------------------
// Collection functions
// --------------------------------
Db.prototype.findOne = function() {
	var args = Array.prototype.slice.call(arguments, 1);
	this.collection(arguments[0], function(err, collection) {
		if (err) return args.pop()(err);
		collection.findOne.apply(collection, args);
	});
};

Db.prototype.insertOne = function() {
	var args = Array.prototype.slice.call(arguments, 1);
	this.collection(arguments[0], function(err, collection) {
		if (err) return args.pop()(err);
		collection.insertOne.apply(collection, args);
	});
};

Db.prototype.dropCollection = function(collectionName, callback) {
	this.collection(collectionName, function(err, collection) {
		if (err) return callback(err);
		collection.drop(function(err, result) {
			// Ignore "ns not found" error
			if (err && err.message == "ns not found") return callback(null, result);
			callback(err, result);
		});
	});
};

var master = new Db(config.master);
var slave = config.slave ? new Db(config.slave) : this.master;

exports.master = master;
exports.slave = slave;

