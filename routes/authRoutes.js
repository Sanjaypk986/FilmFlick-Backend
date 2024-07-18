const express = require("express");
const { login, Verify, Logout } = require("../controllers/authController");

const router = express.Router();

// Login
router.post('/login',login)
router.get('/verify', Verify)
router.get('/logout',Logout)
module.exports = router;

