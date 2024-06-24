import Customers from "@/model/Customers";
import connectDb from "../../middleware/mongoose";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import Update from "@/model/Update";

// Function to generate customer ID in series
const generateCustomerID = async () => {
  try {
    const highestCustomer = await Customers.findOne({}, { CustomerID: 1 }).sort({ CustomerID: -1 });
    let nextID;
    if (highestCustomer) {
      const highestIDNumber = parseInt(highestCustomer.CustomerID.slice(3));
      nextID = `CXT${(highestIDNumber + 1).toString().padStart(3, "0")}`;
    } else {
      nextID = "CXT001";
    }
    return nextID;
  } catch (error) {
    throw new Error("Error generating customer ID");
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      
      if (req.body.SHEET_CODE != process.env.SHEET_CODE) {
        return res
          .status(403)
          .json({ success: false, errors: "Unable to Authenticate" });
      }

      console.log(req.body);

      // Generate the next customer ID
      const nextCustomerID = await generateCustomerID();

      const newCard = new Customers({
        CustomerID: nextCustomerID,
        CustomerName: req.body.CustomerName,
        CustomerPhone: req.body.CustomerPhone,
        CustomerWatsapp: req.body.CustomerWatsapp,
        CustomerTransaction: req.body.CustomerTransaction,
      });

      const addUpdate = new Update({
        CustomerID: nextCustomerID,
        update: "Your Payment is successful."
      })
      const addUpdate1 = new Update({
        CustomerID: nextCustomerID,
        update: `Your Token is ${nextCustomerID}.`
      })


      let student1 = await addUpdate.save();
      let student2 = await addUpdate1.save();
      let student = await newCard.save();
      console.log(student);
      return res.status(200).json({ success: true,Name:student.CustomerName , msg: `${nextCustomerID} - Customer Added Successfully.`});
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }
};

export default connectDb(handler);
