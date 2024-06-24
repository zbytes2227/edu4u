const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const SalesManSchema = new mongoose.Schema(
  {
    UpdateID: { type: String, required: true, unique: true },
    UpdateTitle: { type: String },
    UpdateDescription: { type: String },
    UpdateLink: { type: String },
  },
  { collection: "all-updates" },
  { timestamps: true }
);

mongoose.models = {};
const Update = mongoose.model("Updates", SalesManSchema);
module.exports = Update;