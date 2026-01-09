import React, { useState } from "react";
import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { updateStatus } from "../api/admin.api";
import Toast from "./Toast";
const STATUS_FLOW = ["pending", "accepted", "shipped", "delivered"];
const statusButtonColors = {
  pending: "bg-yellow-600 hover:bg-yellow-700",
  accepted: "bg-blue-600 hover:bg-blue-700",
  shipped: "bg-purple-600 hover:bg-purple-700",
  delivered: "bg-green-600 hover:bg-green-700",
};

const OrderDetails = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  // get orderId from URL
  const { orderId } = useParams({ from: "/orders/$orderId" });

  // get order data from navigation state
  const { location } = useRouterState();
  const initialOrder = location.state;
  const [order, setOrder] = useState(initialOrder);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }
  const currentIndex = STATUS_FLOW.indexOf(order.orderStatus);
  const nextStatus = STATUS_FLOW[currentIndex + 1];

  const onSuccess = ()=>{
    setToast({ type: "success", message: "Order Status is updated Succesfully..." })
  }
  const onError = ()=>{
    setToast({ type: "error", message: "Order Status is updated unsuccesfully..." })
  }
  const handleNextStatus = async () => {
    if (!nextStatus) return;

    // Optimistic UI
    setOrder((prev) => ({
      ...prev,
      orderStatus: nextStatus,
    }));

    try {
      const res = await updateStatus(orderId, {
        orderStatus: nextStatus,
      });

      if (res.data.success) {
        onSuccess() // ✅ sync with backend
      }
    } catch (error) {
      onError()
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <button
        onClick={() => navigate({ to: "/orders" })}
        className="mb-4 text-blue-600 font-medium"
      >
        ← Back to Orders
      </button>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {/* Product */}
        <div className="flex gap-4">
          <img
            src={order.productId.productImage}
            alt={order.productId.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{order.productId.name}</h2>
            <p className="text-gray-600">Size: {order.selectedSize}</p>
            <p className="text-gray-600">Qty: {order.quantity}</p>
            <p className="font-bold text-lg mt-1">₹{order.price}</p>
          </div>
        </div>

        {/* Status */}
        {nextStatus ? (
          <button
            onClick={handleNextStatus}
            className={`px-4 py-2 text-white rounded-lg transition ${statusButtonColors[nextStatus]}`}
          >
            Move to {nextStatus.toUpperCase()}
          </button>
        ) : (
          <p className="mt-3 text-green-600 font-semibold">
            ✅ Order Delivered
          </p>
        )}

        {/* User */}
        <div>
          <h3 className="font-semibold">Customer Details</h3>
          <p>{order.userId.name}</p>
          <p>{order.userId.email}</p>
          <p>+91 {order.userId.phoneNo}</p>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-500">
          Ordered on: {new Date(order.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
