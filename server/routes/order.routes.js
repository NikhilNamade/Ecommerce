import express from "express";
import {getAllOrders, getOrderProductByUserId, orderProduct, updateStatus} from "../controller/order.controller.js"
import { authToken } from "../helper/jwt.helper.js";
const router =  express.Router();

router.post("/OrderProduct",orderProduct)
router.get("/getProduct",authToken,getOrderProductByUserId)
router.get("/getallOrders",getAllOrders);
router.patch("/updateStatus/:id",updateStatus);
export default router;