import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  // Auth form states
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  // Load orders when user is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setOrdersLoading(true);
      setOrdersError("");

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        setOrdersError(err.message || "Failed to load orders.");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const { data, error } = isLogin
        ? await supabase.auth.signInWithPassword(authForm)
        : await supabase.auth.signUp(authForm);

      if (error) throw error;
      
      if (!isLogin) {
        setAuthError("Check your email for verification link!");
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is logged in - show profile page
  if (user) {
    const isVerified = !!user.email_confirmed_at;

    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">My Account</h1>
            <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-black mb-4">Profile</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-black">{user.email}</p>
                  </div>

                  {!isVerified && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <p className="text-sm text-amber-800">
                        Please verify your email to secure your account.
                      </p>
                    </div>
                  )}

                  {isVerified && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-700 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Email verified
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-amber-700 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full border border-gray-300 text-black py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-black mb-6">Order History</h2>

                {ordersLoading && (
                  <div className="text-center py-8">
                    <div className="w-6 h-6 border-2 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading orders...</p>
                  </div>
                )}

                {ordersError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <p className="text-red-800 text-sm">{ordersError}</p>
                  </div>
                )}

                {!ordersLoading && !ordersError && orders.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-gray-600 mb-2">No orders yet</p>
                    <p className="text-sm text-gray-500">Start shopping to see your orders here</p>
                  </div>
                )}

                {!ordersLoading && orders.length > 0 && (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-black">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered" || order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped" || order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Cancelled" || order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {order.status || "Processing"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="font-semibold text-black">₹{order.total_price?.toLocaleString()}</p>
                          </div>
                          
                          {order.products && Array.isArray(order.products) && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{order.products.length} item(s)</p>
                            </div>
                          )}
                        </div>

                        {/* Product details */}
                        {order.products && Array.isArray(order.products) && order.products.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="space-y-1">
                              {order.products.slice(0, 3).map((item, idx) => (
                                <p key={idx} className="text-sm text-gray-600">
                                  {item.name} × {item.qty}
                                </p>
                              ))}
                              {order.products.length > 3 && (
                                <p className="text-sm text-gray-500 italic">
                                  +{order.products.length - 3} more items
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User not logged in - show auth forms
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleAuthSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-black placeholder-gray-500 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-black placeholder-gray-500 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-800 text-sm">{authError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-amber-700 text-white py-3 px-4 rounded-md font-semibold hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {authLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;