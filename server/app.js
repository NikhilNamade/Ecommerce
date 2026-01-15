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
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-gray-five-88.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

