import { useNavigate } from "@tanstack/react-router";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const OrderCard = ({ order}) => {
  const navigate = useNavigate();
    if (!order?.productId) {
    return (
      <div className="p-4 bg-white rounded-xl shadow text-gray-500">
        Product not available
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        navigate({
          to: "/orders/$orderId",
          params: { orderId: order._id },
          state: order
        });
        console.log("Hii");
      }}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      {/* Product Image */}
      <img
        src={order.productId?.productImage || ""}
        alt={order.productId.name}
        className="w-16 h-16 rounded-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{order.productId.name}</h3>

        <span
          className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
            statusColors[order.orderStatus]
          }`}
        >
          {order.orderStatus.toUpperCase()}
        </span>
      </div>

      {/* Arrow */}
      <span className="text-gray-400 text-xl">›</span>
    </div>
  );
};

export default OrderCard;
