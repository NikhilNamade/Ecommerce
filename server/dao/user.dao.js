import User from "../model/user.model.js"

export const login_dao = async(phoneNo)=>{
    let result = await User.findOne({phoneNo});
    return result;
}

export const register_dao = async(phoneNo)=>{
    let newUser = new User({
        phoneNo,
    });
    await newUser.save();
    return newUser;
}

export const update_dao = async(updatedUser,id)=>{
    let result = await User.findByIdAndUpdate(id,{$set:updatedUser},{new:true});
    return result;
}