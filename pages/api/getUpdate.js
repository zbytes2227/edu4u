
import Update from "@/model/Updates";
import connectDb from "../../middleware/mongoose";
import { parse } from "cookie"; import jwt from "jsonwebtoken";

const handler = async (req, res) => {
if (req.method === "POST") {
    try {

      // Find all cards in the database
      const allCards = await Update.find({CustomerID: req.body.id});

      // Return the found cards as a JSON response
      return res.status(200).json({ success: true, Updates: allCards });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }

};

export default connectDb(handler);
