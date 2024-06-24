const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const ProductSchema = new mongoose.Schema(
  {
    ProductID: { type: String, required: true, unique: true },
    ProductName: { type: String },
    ProductBranch: { type: String },
    ProductSemester: { type: String },
    ProductLink: { type: String },
  },
  { collection: "all-Products" },
  { timestamps: true }
);

mongoose.models = {};
const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;