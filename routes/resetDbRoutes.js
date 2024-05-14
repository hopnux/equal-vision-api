const express = require("express");
const router = express.Router();
const resetDbController = require("../controllers/resetDbController");
const { expressjwt: checkJwt } = require("express-jwt");

// GET ALL ARTISTS
router.get(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  resetDbController.resetDb,
);

module.exports = router;
