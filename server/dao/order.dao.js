import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
export const orderProduct_dao = async (
  productId,
  userId,
  quantity,
  price,
  selectedSize,
  address
) => {
  const order = new Order({
    productId,
    userId,
    quantity,
    orderedprice : price,
    selectedSize,
    address,
  });
  await order.save();
  return order;
};

export const isProductQuantitySufficient = async (productId, orderQuantity) => {
  console.log(productId, orderQuantity);
  const product = await Product.findById(productId);

  if (!product) {
    return false; // product does not exist
  }
  console.log(product);
  return product.quantity >= orderQuantity;
};

export const Update_stock_dao = async (productId, quantity) => {
  const result = await Product.updateOne(
    { _id: productId, quantity: { $gt: 0 } },
    { $inc: { quantity: -quantity } }
  );
  return result;
};

export const getOrderProductByUser_dao = async (userId) => {
  const result = await Order.find({ userId })
    .populate({
      path: "productId",
      select: "name productImage",
    })
    .sort({ createdAt: -1 });

  return result;
};

export const getAllOrders_dao = async () => {
  const result = await Order.find()
    .populate({
      path: "userId",
      select: "name email phoneNo",
    })
    .populate({
      path: "productId",
      select: "name productImage",
    })
    .sort({ createdAt: -1 });

  return result;
};

export const update_status_dao = async(id,orderStatus)=>{
  const result = await Order.findByIdAndUpdate(id,{$set:{orderStatus}},{new:true});
  return result;
}
