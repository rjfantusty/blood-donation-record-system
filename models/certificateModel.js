const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  donor: { type: Schema.Types.ObjectId, ref: "Donor", required: true },
  blood_bank: { type: Schema.Types.ObjectId, ref: "BloodBank", required: true },
  time: { type: Date, default: Date.now },
  place: { type: String, required: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);
