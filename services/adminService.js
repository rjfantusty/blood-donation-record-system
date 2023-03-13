const AdminModel = require("../models/adminModel");

const getAdmin = async (data) => {
  const admin = await AdminModel.findOne(data);
  return admin;
};

module.exports = {
  getAdmin
}
