const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/tokens/users", authController.validateUser);

router.post("/tokens/admins", authController.validateAdmin);

module.exports = router;
