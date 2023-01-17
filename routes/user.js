const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const {signup} = require("../controller/userController");
const user = require('../model/user');
router.route('/signup').post(signup);

module.exports = router ;