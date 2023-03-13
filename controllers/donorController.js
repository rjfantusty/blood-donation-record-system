const { getCertificates } = require("../services/certificateService");
const { createDonor, getDonor } = require("../services/donorService");
const { verifyPassword } = require("../services/passwordService");
const { createToken } = require("../services/tokenService");

module.exports.renderSignup = (req, res) => {
  res.render("donors/signup");
};

module.exports.renderLogin = (req, res) => {
  res.render("donors/login");
};

module.exports.dashboard = async (req, res) => {
  const certificates = await getCertificates({ donor: req.donor._id });
  console.log(certificates);
  res.render("donors/dashboard", { certificates });
};

module.exports.login = async (req, res) => {
  // check if all fields are present.
  // get donor using phone_no
  // verify donor's password
  // create a token for donor
  // attach that token to his session
  // redirect to dashboard

  const { phone_no, password } = req.body;
  if (!phone_no || !password) {
    req.flash("error", "All fields are required.");
    return res.redirect("/donor/login");
  }

  const donor = await getDonor({ phone_no });
  if (!donor) {
    req.flash("error", "Donor details not found or password is incorrect");
    return res.redirect("/donor/login");
  }

  const passwordMatches = await verifyPassword(donor.password, password);
  if (!passwordMatches) {
    req.flash("error", "Donor details not found or password is incorrect");
    return res.redirect("/donor/login");
  }

  const token = createToken({ phone_no: donor.phone_no, name: donor.user });

  res.cookie("token", token);

  res.redirect("/donor/dashboard");
};

module.exports.signup = async (req, res) => {
  // check if all fields are present
  // create Donor (keep in mind to hash the password)
  // redirect to login page

  const { name, phone_no, aadhar_no, password } = req.body;

  if (!name || !phone_no || !aadhar_no || !password) {
    req.flash("error", "All fields are required.");
    return res.redirect("/donor/login");
  }

  await createDonor({ name, phone_no, aadhar_no, password });

  req.flash("success", "Donor created successfully.");
  res.redirect("/donor/login");
};
