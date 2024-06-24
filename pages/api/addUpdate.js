
import Update from "@/model/Update";
import connectDb from "../../middleware/mongoose";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

// Function to generate Update ID in series
const generateUpdateID = async () => {
  try {
    const highestUpdate = await Update.findOne({}, { UpdateID: 1 }).sort({ UpdateID: -1 });
    let nextID;
    if (highestUpdate) {
      const highestIDNumber = parseInt(highestUpdate.UpdateID.slice(1));
      nextID = `S${(highestIDNumber + 1).toString().padStart(3, "0")}`;
    } else {
      nextID = "S001";
    }
    return nextID;
  } catch (error) {
    throw new Error("Error generating Update ID");
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.admin_access_token;
      let decoded = await jwt.verify(token, process.env.TOKEN_ADMIN);
      if (!decoded._id === process.env.ADMIN_PASSWORD) {
        return res
          .status(403)
          .json({ success: false, errors: "Unable to Authenticate" });
      }

      console.log(req.body);

      // Generate the next Update ID
      const nextUpdateID = await generateUpdateID();

      const newCard = new Update({
        UpdateID: nextUpdateID,
        UpdateTitle: req.body.UpdateTitle,
        UpdateDescription: req.body.UpdateDescription,
        UpdateLink: req.body.UpdateLink
      });

      await newCard.save();
      console.log("okay");
      return res.status(200).json({ success: true, msg: `${nextUpdateID} - Update Added Successfully.` });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }
};

export default connectDb(handler);
