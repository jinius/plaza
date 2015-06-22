var express = require("express");
var user = require("../handlers/user");
var post = require("../handlers/post");

var router = express.Router();

router.post("/user/register", user.register);
router.post("/post", post.create);

module.exports = router;

