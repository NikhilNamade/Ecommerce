import { coupon_dao,addCoupons_dao } from "../dao/coupon.dao.js";

export const getCoupon_service = async (code, orderAmount) => {
  const coupon = await coupon_dao(code);
  if (!coupon) {
    return { success: false, message: "Invalid coupon code" };
  }

  if (coupon.expiryDate < new Date()) {
    return {
      success: false,
      message: "Coupon expired",
    };
  }
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return {
      success: false,
      message: "Coupon usage limit exceeded",
    };
  }
  if (orderAmount && orderAmount < coupon.minOrderAmount) {
    return {
      success: false,
      message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
    };
  }
  return {
    success: true,
    coupon: coupon,
  };
};

export const addCoupons_services = async (
  code,
  discountValue,
  minOrderAmount,
  expiryDate,
  usageLimit
) => {
  const couponData = {
    code: code.toUpperCase(),
    discountValue,
    minOrderAmount,
    expiryDate,
    usageLimit,
  };

  return await addCoupons_dao(couponData);
};

