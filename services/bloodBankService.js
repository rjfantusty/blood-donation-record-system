const BloodBankModel = require("../models/bloodBankModel");
const { hashPassword } = require("./passwordService");

const createBloodBankService = async (data) => {
  const hashed_password = await hashPassword(data.password);
  const bloodBank = await BloodBankModel.create({
    ...data,
    password: hashed_password,
  });
  return bloodBank;
};

const getBloodBankService = async (data) => {
  const bloodBank = await BloodBankModel.findOne(data);
  return bloodBank;
};

module.exports = {
  createBloodBankService,
  getBloodBankService,
};
