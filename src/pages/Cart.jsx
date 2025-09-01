import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const Cart = () => {
  const { cart } = useCart();
  const { userLoggedIn } = useUser();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 30;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    if (userLoggedIn()) {
      navigate("/checkout");
    } else {
      navigate("/profile");
      toast.info("Please login to proceed to checkout");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-black hover:text-amber-700 transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Shopping Cart</h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
          {cart.length > 0 && (
            <p className="text-gray-600 mt-2">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/"
              className="inline-flex items-center bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              <ShoppingBag size={20} className="mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-black mb-6">Cart Items</h2>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={item.id}>
                      <CartItem item={item} />
                      {index < cart.length - 1 && <hr className="border-gray-200 mt-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-black mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping > 0 ? `₹${shipping}` : 'Free'}</span>
                  </div>
                  
                  {subtotal < 500 && subtotal > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <p className="text-sm text-amber-800">
                        Add ₹{(500 - subtotal).toLocaleString()} more for free shipping!
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black">Total</span>
                    <span className="text-2xl font-bold text-amber-700">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-800 transition-colors duration-200 mb-4"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <Link
                    to="/"
                    className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Secure checkout
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Fast delivery
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Easy returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;