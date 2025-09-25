const User = require("./User");
const mongoose = require("mongoose");

const pilotSchema = new mongoose.Schema({
  name: String,
  department: String,
  studentID: String,
  gender: String,
  vehicleType: String,
  vehicleNumber: String,
  isVerified:{ type: Boolean, default: false, required: true },
  isApproved: { type: Boolean, default: false, required: true }, // Admin approves
  isLive: { type: Boolean, default: false, required: true },     // Ready for rides
  ratingAverage: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 } // To calculate average
});

const Pilot = User.discriminator("pilot", pilotSchema);
module.exports = Pilot;
