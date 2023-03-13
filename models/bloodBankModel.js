const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodBankSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);
