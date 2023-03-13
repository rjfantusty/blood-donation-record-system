const { getAdmin } = require("./services/adminService");
const { getBloodBankService } = require("./services/bloodBankService");
const { getDonor } = require("./services/donorService");
const { verifyToken } = require("./services/tokenService");

const isLoggedIn = (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Login to continue.");
    return res.redirect("/");
  }
  next();
};

const isDonor = async (req, res, next) => {
  const { phone_no } = verifyToken(req.cookies.token);
  if (!phone_no) {
    req.flash("error", "Login as a donor");
    return res.redirect("/donor/login");
  }

  const donor = await getDonor({ phone_no });
  if (!donor) {
    req.flash("error", "Login as a donor");
    return res.redirect("/donor/login");
  }

  req.donor = donor;
  next();
};

const isAdmin = async (req, res, next) => {
  const { username } = verifyToken(req.cookies.token);

  try {
    if (!username) throw new Error("Login as an admin to continue.");
    const admin = await getAdmin({ username });
    if (!admin) throw new Error("Login as an admin to continue.");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/admin/login");
  }

  next();
};

const isBloodBank = async (req, res, next) => {
  const { username } = verifyToken(req.cookies.token);

  try {
    if (!username) throw new Error("Login as a blood bank to continue.");
    const bloodBank = await getBloodBankService({ username });
    if (!bloodBank) throw new Error("Login as a blood bank to continue.");
    req.bloodBank = bloodBank;
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/blood-bank/login");
  }

  next();
};

module.exports = {
  isLoggedIn,
  isDonor,
  isAdmin,
  isBloodBank,
};
