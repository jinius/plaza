var express = require('express');
var user = require('../handlers/user');

var router = express.Router();

router.post('/user/register', user.register);

module.exports = router;

