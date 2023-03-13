const AdminModel = require("../models/adminModel");
const { getAdmin } = require("../services/adminService");
const { verifyPassword } = require("../services/passwordService");
const { createToken } = require("../services/tokenService");

module.exports.renderLoginForm = async (req, res) => {
  return res.render("admin/login");
};

module.exports.dashboard = async (req, res) => {
  return res.render("admin/dashboard");
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash("error", "All fields are required.");
    return res.redirect("/admin/login");
  }

  const admin = await getAdmin({ username, password });
  if (!admin) {
    req.flash("error", "No admin found with provided credentials.");
    return res.redirect("/admin/login");
  }

  const token = createToken({ username });

  res.cookie("token", token);

  return res.redirect("/admin/dashboard");
};
