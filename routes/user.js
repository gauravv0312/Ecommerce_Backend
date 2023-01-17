const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const {signup,login} = require("../controller/userController");
const user = require('../model/user');
router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router ;