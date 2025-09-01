import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const { user } = useUser();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: form.name,
        shipping_address: form.address,
        city: form.city,
        postal_code: form.postalCode,
        phone: form.phone,
        total_price: total,
        products: cart,
        user_id: user.id
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong: " + error.message);
    } else {
      clearCart();
      navigate("/checkout/success");
    }
  };

  const fieldLabels = {
    name: "Full Name",
    address: "Street Address", 
    city: "City",
    postalCode: "Postal Code",
    phone: "Phone Number"
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Checkout</h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-black mb-6">Shipping Information</h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              {["name", "address", "city", "postalCode", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black mb-2">
                    {fieldLabels[field]}
                  </label>
                  <input
                    name={field}
                    type={field === "phone" ? "tel" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-black placeholder-gray-500 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-colors"
                    placeholder={`Enter your ${fieldLabels[field].toLowerCase()}`}
                  />
                </div>
              ))}
              
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-amber-700 text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-8"
              >
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <OrderSummary cart={cart} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;