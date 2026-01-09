import { useState } from "react";
import OrderCard from "../componenets/OrderCard";
import { useEffect } from "react";
import { getAllOrders } from "../api/admin.api";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let result = await getAllOrders();
      setOrders(result.data.result);
    };
    fetchOrders();
  }, []);
  return (
    <div className="bg-gray-100 p-4 h-[calc(100vh-64px)] overflow-y-hidden">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="p-6 overflow-y-scroll">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))
        ) : (
          <div className="w-full h-screen justify-center items-center">
            <h2>Products Not Found...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
