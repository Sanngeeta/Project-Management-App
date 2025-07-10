const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/user.controller');

router.post('/user-register', authCtrl.register);
router.post('/user-login', authCtrl.login);

module.exports = router;
