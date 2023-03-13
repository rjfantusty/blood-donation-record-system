const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");
const { isLoggedIn, isDonor, isBloodBank } = require("../middlewares");
const {
  bloodBankLoginForm,
  bloodBankLogin,
  createBloodBank,
  dashboard,
  issueCertificate,
} = require("../controllers/bloodBanksController");

router.route("/login").get(bloodBankLoginForm).post(bloodBankLogin);
router.route("/create").post(createBloodBank);
router.route("/dashboard").get(isLoggedIn, isBloodBank, dashboard);
router.route('/issue-certificate').post(isLoggedIn, isBloodBank, issueCertificate)

module.exports = router;
