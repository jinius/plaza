var express = require("express");
var user = require("../handlers/user");
var post = require("../handlers/post");

var router = express.Router();

router.post("/user/register", user.register);
router.post("/post", post.create);
router.get("/post/:_id", post.read);
router.get("/post", post.readByWriterId);

module.exports = router;

