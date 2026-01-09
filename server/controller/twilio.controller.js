import { wrapAsyncHandler } from "../utils/errorhandling.utils.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendMsg_controller = wrapAsyncHandler(async (req, res) => {
  try {
    await client.messages.create({
      body: "Hello Nikhil! This is a real SMS 🚀",
      from: process.env.TWILIO_PHONE,
      to: "+917045032193", // real mobile number
    });
    res.json({success:true})
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Unable to send msg" });
  }
});
