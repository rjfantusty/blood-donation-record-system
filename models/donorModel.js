const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  name: { type: String, required: true },
  phone_no: { type: String, required: true },
  aadhar_no: { type: Number, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("Donor", donorSchema);
