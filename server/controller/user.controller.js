import { login_dao, register_dao } from "../dao/user.dao.js";
import { generateToken } from "../helper/jwt.helper.js";
import User from "../model/user.model.js";
import { update_service } from "../services/user.service.js";
import { wrapAsyncHandler } from "../utils/errorhandling.utils.js";

export const login_controller = wrapAsyncHandler(async (req, res) => {
  try {
    const { phoneNo } = req.body;
    let result = await login_dao(phoneNo);
    if (!result) {
      const err = new Error("User not found");
      err.status = 404; // optional, for proper HTTP status
      throw err; // this will go to errorHandler
    }
    const token = generateToken(result._id);
    res.json({ success: true,result,token});
  } catch (error) {
    throw error;
  }
});

export const register_controller = wrapAsyncHandler(async (req, res) => {
  try {
    const { phoneNo } = req.body;
    let result = await register_dao(phoneNo);
    const token = generateToken(result._id);
    res.json({ success: true,result,token});
  } catch (error) {
    throw error;
  }
});

export const update_controller = wrapAsyncHandler(async (req, res) => {
  try {
    const { name, email, primaryAddress, secondaryAddress, optionalAddress } =
      req.body;
    const id = req.params.id;
    let result = await update_service(
      name,
      email,
      primaryAddress,
      secondaryAddress,
      optionalAddress,
      id
    );
    res.json({ success: true, result });
  } catch (error) {
    throw error;
  }
});

export const get_user_controller = wrapAsyncHandler(async(req,res)=>{
  try {
    let user = await User.findById(req.user);
    if(!user){
      throw new Error("User not found");
      return
    } 

    res.json({success:true,user});
  } catch (error) {
    throw error;
  }
})