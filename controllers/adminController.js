const AdminModel = require("../models/adminModel");
const { getAdmin } = require("../services/adminService");
const { getCertificates } = require("../services/certificateService");
const { verifyPassword } = require("../services/passwordService");
const { createToken } = require("../services/tokenService");

module.exports.renderLoginForm = async (req, res) => {
  return res.render("admin/login");
};

module.exports.dashboard = async (req, res) => {
  const total_donors = await getCertificates({});

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(today);
  const total_donors_today = await getCertificates({ time: { $gte: today } });

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  console.log(weekAgo);
  const total_donors_week = await getCertificates({
    time: { $gte: weekAgo },
  });

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  console.log(monthAgo);
  const total_donors_month = await getCertificates({
    time: { $gte: monthAgo },
  });

  console.log(total_donors);
  console.log(total_donors_today);

  return res.render("admin/dashboard", {
    totalDonors: total_donors.length,
    totalDonorToday: total_donors_today.length,
    totalDonorsWeek: total_donors_week.length,
    totalDonorsMonth: total_donors_month.length,
  });
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
