import express from "express"
import { sendMsg_controller } from "../controller/twilio.controller.js";

const route = express.Router();

route.post("/sendMsg",sendMsg_controller)

export default route;