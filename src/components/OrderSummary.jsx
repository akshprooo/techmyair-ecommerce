import React from "react";

const OrderSummary = ({ cart, total }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex-1">
              <span className="text-black font-medium">{item.name}</span>
              <span className="text-gray-600 ml-2">× {item.qty}</span>
            </div>
            <span className="text-black font-semibold">₹{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {cart.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Your cart is empty
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-amber-700">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-black">Total</span>
            <span className="text-xl font-bold text-amber-700">₹{total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;