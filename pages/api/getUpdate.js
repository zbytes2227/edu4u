
import Update from "@/model/Updates";
import connectDb from "../../middleware/mongoose";
import { parse } from "cookie"; import jwt from "jsonwebtoken";
import Customers from "@/model/Customers";

const handler = async (req, res) => {
if (req.method === "POST") {
    try {

      // Find all cards in the database
      const allCards = await Update.find({CustomerID: req.body.id});
      const student = await Customers.find({CustomerID: req.body.id});
  

      // Return the found cards as a JSON response
      return res.status(200).json({ success: true, Updates: allCards, Names : student[0].CustomerName });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }

};

export default connectDb(handler);
