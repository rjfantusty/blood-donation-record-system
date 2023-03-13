const BloodBankModel = require("../models/bloodBankModel");
const CertificateModel = require("../models/certificateModel");
const {
  createBloodBankService,
  getBloodBankService,
} = require("../services/bloodBankService");
const { createCertificateService } = require("../services/certificateService");
const { getDonor } = require("../services/donorService");
const { verifyPassword } = require("../services/passwordService");
const { createToken } = require("../services/tokenService");

module.exports.bloodBankLoginForm = (req, res) => {
  return res.render("bloodBanks/login");
};

module.exports.issueCertificate = async (req, res) => {
  const { aadhaar } = req.body;

  try {
    if (!aadhaar) throw new Error("Aadhaar number is required.");
    const donor = await getDonor({ aadhar_no: aadhaar });
    if (!donor)
      throw new Error("No donor found with the given aadhaar number.");

    var date = new Date();
    var current_time = date.toLocaleTimeString();
    const current_date = date.toLocaleDateString();

    const certificate = await createCertificateService({
      donor: donor._id,
      blood_bank: req.bloodBank._id,
      place: req.bloodBank.address,
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/blood-bank/dashboard");
  }

  req.flash("success", "Certificate has been successfully geenrated.");
  return res.redirect("/blood-bank/dashboard");
};

module.exports.dashboard = async (req, res) => {
  return res.render("bloodBanks/dashboard");
};

module.exports.bloodBankLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw new Error("All fields are required.");
    const bloodBank = await getBloodBankService({ username });
    if (!bloodBank)
      throw new Error("No blood bank forund with provided details.");

    const password_matches = await verifyPassword(bloodBank.password, password);
    if (!password_matches)
      throw new Error("No blood bank forund with provided details.");

    const token = createToken({ username });

    res.cookie("token", token);

    return res.redirect("/blood-bank/dashboard");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/blood-bank/login");
  }

  res.end();
};

module.exports.createBloodBank = async (req, res) => {
  const { name, address, contact, username, password } = req.body;

  if (!name || !address || !contact || !username || !password) {
    console.log({ name, address, contact, username, password });
    req.flash("error", "All fields are required.");
    return res.redirect("/admin/dashboard");
  }

  await createBloodBankService(req.body);

  req.flash("success", "Blood bank successfully created.");
  res.redirect("/admin/dashboard");
};
