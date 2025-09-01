import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-12 text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-black mb-4">Order Placed Successfully!</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for shopping with us. We'll send order updates to your email address.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-amber-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-amber-800 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          
          <Link
            to="/profile"
            className="block w-full border border-gray-300 text-black py-3 px-6 rounded-md font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;