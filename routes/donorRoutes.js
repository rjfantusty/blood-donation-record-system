const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");
const { isLoggedIn, isDonor } = require("../middlewares");

router
  .route("/signup")
  .get(donorController.renderSignup)
  .post(donorController.signup);

router
  .route("/login")
  .get(donorController.renderLogin)
  .post(donorController.login);

router.get("/dashboard", isLoggedIn, isDonor, donorController.dashboard);

// router.get("/logout");

module.exports = router;
