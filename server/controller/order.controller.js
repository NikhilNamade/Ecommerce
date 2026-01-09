import { wrapAsyncHandler } from "../utils/errorhandling.utils.js";
import {
  getAllOrders_dao,
  getOrderProductByUser_dao,
  isProductQuantitySufficient,
  orderProduct_dao,
  update_status_dao,
  Update_stock_dao,
} from "../dao/order.dao.js";
import { Update_coupon_dao } from "../dao/coupon.dao.js";

export const orderProduct = wrapAsyncHandler(async (req, res) => {
  try {
    const {
      productId,
      userId,
      quantity,
      orderedprice,
      selectedSize,
      address,
      couponId,
    } = req.body;
    if (!productId || !userId || !quantity || !orderedprice || !selectedSize) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let isValid = await isProductQuantitySufficient(productId, quantity);
    if (!isValid) {
      return res.status(400).json({
        success: isValid,
        message: "Order placed Unsuccessfully",
        result: null,
      });
    }
    const result = await orderProduct_dao(
      productId,
      userId,
      quantity,
      orderedprice,
      selectedSize,
      address
    );
    let updateStock = null;
    let updateCoupon = null;
    if (couponId) {
      try {
        updateStock = await Update_stock_dao(productId, quantity);
        updateCoupon = await Update_coupon_dao(couponId);
      } catch (err) {
        console.log("Coupon update failed:", err.message);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
    console.log(updateStock);
    console.log(updateCoupon);
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order placed Unsuccessfully",
      result: error,
    });
  }
});

export const getOrderProductByUserId = wrapAsyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const result = await getOrderProductByUser_dao(userId);
    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order placed Unsuccessfully",
      result: error,
    });
  }
});

export const getAllOrders = wrapAsyncHandler(async (req, res) => {
  try {
    const result = await getAllOrders_dao();
    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order placed Unsuccessfully",
      result: error,
    });
  }
});

export const updateStatus = wrapAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await update_status_dao(id, req.body.orderStatus);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order placed Unsuccessfully",
      result: error,
    });
  }
});
