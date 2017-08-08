const express = require('express');
const router = express.Router();
const userCtrl  =  require('./user.controllers');

router.post('/login', userCtrl.login);


module.exports = router;