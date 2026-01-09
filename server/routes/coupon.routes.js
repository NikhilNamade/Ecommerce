import express from "express";
import { addCoupons, getCoupon } from "../controller/coupon.controller.js";

const router = express.Router();

router.get("/getCoupons",getCoupon);
router.post("/addCoupons",addCoupons);
export default router;