import "dotenv/config";
import express from "express";
import { connectTomongoose } from "./config/db.config.js";
import cors from "cors";
import Admin from "./routes/admin.routes.js";
import User from "./routes/user.route.js";
import Order from "./routes/order.routes.js";
import Coupon from "./routes/coupon.routes.js";
import Twilio from "./routes/twilio.routes.js";
import { errorHandler } from "./utils/errorhandling.utils.js";

connectTomongoose();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(
  cors({
    origin: "*",
    credentials: true, // REQUIRED for cookies / auth
  })
);

app.use("/auth/admin", Admin);
app.use("/auth/user", User);
app.use("/api/order", Order);
app.use("/api/coupon", Coupon);
app.use("/api/twilio",Twilio);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listen on http://localhost:3000");
});
