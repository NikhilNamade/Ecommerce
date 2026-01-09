import mongoose, {Schema } from "mongoose";
import Order from "./order.model.js"

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    subcategory:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true,
    },
    sizes:{
      type:[String],
      required:true,
    },
    price: {
    actualPrice: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
  },
},{timestamps:true});

productSchema.pre("findOneAndDelete", async function (next) {
  const product = await this.model.findOne(this.getQuery());

  if (product) {
    await Order.deleteMany({ productId: product._id });
  }

  next();
});

productSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await Order.updateMany(
      { productId: doc._id },
      { $set: { price: doc.price } }
    );
  }
});


export default mongoose.model("Products",productSchema);