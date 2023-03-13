const express = require("express");
const {
  renderLoginForm,
  login,
  dashboard,
} = require("../controllers/adminController");
const { isLoggedIn, isAdmin } = require("../middlewares");
const router = express.Router();

router.route("/login").get(renderLoginForm).post(login);
router.route("/dashboard").get(isLoggedIn, isAdmin, dashboard);

module.exports = router;
