var express = require("express");
var user = require("../handlers/user");
var post = require("../handlers/post");

var router = express.Router();

router.route("/user/register")
	.post(user.register);

router.route("/post")
	.post(post.create)
	.get(post.readByWriterId);

router.route("/post/:_id")
	.get(post.read);

module.exports = router;

