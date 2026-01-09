
import { getallCoupon_dao } from "../dao/coupon.dao.js";
import { addCoupons_services } from "../services/coupon.services.js";
import { wrapAsyncHandler } from "../utils/errorhandling.utils.js";

export const getCoupon = wrapAsyncHandler(async (req, res) => {
  try {
    let result = await getallCoupon_dao();
    res.status(200).json({success:true,coupons:result});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, result: error });
  }
});

export const addCoupons = wrapAsyncHandler(async(req,res)=>{
  try {
    const {code,discountValue,minOrderAmount,expiryDate,usageLimit} = req.body;
    const result = await addCoupons_services(code,discountValue,minOrderAmount,expiryDate,usageLimit);
    res.status(200).json({success:true,coupons:result});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, result: error });
  }
})
