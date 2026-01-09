import React, { useEffect, useState } from "react";
import { addCoupons, getCoupons } from "../api/admin.api";
import Toast from "../componenets/Toast";

const Coupons = () => {
const [toast, setToast] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const [formData, setFormData] = useState({
    code: "",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: "",
    usageLimit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let result = await addCoupons(formData);
    if(result.data.success){
        onSuccess()
    }else{
        onError();
    }
    setFormData({
      code: "",
      discountValue: "",
      minOrderAmount: "",
      expiryDate: "",
      usageLimit: "",
    });
  };
  useEffect(()=>{
    const fetchCoupons = async()=>{
        let result = await getCoupons();
        setCoupons(result.coupons);
    }
    fetchCoupons();
  })
  
  const onSuccess = ()=>{
    setToast({ type: "success", message: "Coupon added Succesfully..." })
  }
  const onError = ()=>{
    setToast({ type: "error", message: "Coupon added unSuccesfully..." })
  }
  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* LEFT SECTION - ADD COUPON FORM */}
      {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
      <div className="w-1/2 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Add Coupon</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="minOrderAmount"
            placeholder="Minimum Order Amount"
            value={formData.minOrderAmount}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="usageLimit"
            placeholder="Usage Limit"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Add Coupon
          </button>
        </form>
      </div>

      {/* RIGHT SECTION - COUPON LIST */}
      <div className="w-1/2 p-8 overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-6">Available Coupons</h1>

        <div className="space-y-4">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-lg shadow border-l-4 ${coupon.isActive ?  "border-green-500" :  "border-red-500"}`}
            >
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-semibold ${coupon.isActive ? "text-green-600" : "text-red-600"}`}>
                  {coupon.code}
                </h2>
                <span className="text-sm text-gray-500">
                  Expires: {new Date(coupon.expiryDate).toDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">
                Discount: <strong>{coupon.discountValue}</strong>
              </p>
              <p className="text-gray-700">
                Min Order: ₹{coupon.minOrderAmount}
              </p>
              <p className="text-gray-700">
                Usage Limit: {coupon.usageLimit}
              </p>
              <p className="text-gray-700">
                Usage Count: {coupon.usedCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
