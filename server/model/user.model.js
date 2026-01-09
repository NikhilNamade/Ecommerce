import mongoose from "mongoose";
import Order from "./order.model.js"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:null,
    },
    email:{
        type:String,
        default:null
    },
    primaryAddress:{
        type:String,
        default:null
    },
    secondaryAddress:{
        type:String,
        default:null
    },
    optionalAddress:{
        type:String,
        default:null
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true,
         match: [/^\d{10}$/, "Invalid phone number"],
    }
},{timestamps:true});

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());

  if (user) {
    await Order.deleteMany({ userId: user._id });
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;