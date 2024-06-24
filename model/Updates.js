const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const Attendancechema = new mongoose.Schema(
  {
    CustomerID: { type: String, required: true },
    update: { type: String, required: true },
  },
  { collection: "all-updates" },
  { timestamps: true }
);

mongoose.models = {};
const Attendance = mongoose.model("Update", Attendancechema);
module.exports = Attendance;