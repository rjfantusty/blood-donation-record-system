const CertificateModel = require("../models/certificateModel");

const createCertificateService = async (data) => {
  const certificate = await CertificateModel.create(data);
  return certificate;
};

const getCertificates = async (data) => {
  const certificates = await CertificateModel.find(data)
    .populate("donor")
    .populate("blood_bank");
  return certificates;
};

module.exports = {
  createCertificateService,
  getCertificates,
};
