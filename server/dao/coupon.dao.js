import Coupon from "../model/coupon.model.js";
export const coupon_dao = async (code) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });
  return coupon;
};

export const getallCoupon_dao = async()=>{
    const coupons = await Coupon.find();
    return coupons;
}

export const addCoupons_dao = async (couponData) => {
  const newCoupon = new Coupon({
    code: couponData.code,
    discountValue: couponData.discountValue,
    minOrderAmount: couponData.minOrderAmount,
    expiryDate: couponData.expiryDate,
    usageLimit: couponData.usageLimit,
  });

  await newCoupon.save();
  return newCoupon;
};


export const Update_coupon_dao = async (couponId) => {
  const result = await Coupon.findOneAndUpdate(
    {
      _id: couponId,
      $expr: { $lt: ["$usedCount", "$usageLimit"] }
    },
    { $inc: { usedCount: 1 } },
    { new: true }
  );

  if (!result) {
    throw new Error("Coupon usage limit exceeded");
  }

  return result;
};


