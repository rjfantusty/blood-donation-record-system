const DonorModel = require("../models/donorModel");
const { hashPassword } = require("./passwordService");

const createDonor = async (data) => {
  const hashed_password = await hashPassword(data.password);
  const donor = await DonorModel.create({ ...data, password: hashed_password });
  return donor;
};

const getDonor = async (data) => {
  const donor = await DonorModel.findOne(data);
  return donor;
};

module.exports = {
  createDonor,
  getDonor
};
