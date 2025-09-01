import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart } = useCart();
  const { userLoggedIn } = useUser();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const navigate = useNavigate();

  const checkout = () => {
    if (userLoggedIn()) {
      navigate("/checkout");
    } else {
      navigate("/profile");
      return toast.info("Please login to proceed to checkout");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white font-[montserrat]">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit text-black">
            <h3 className="text-xl font-semibold mb-4 font-[montserrat]">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₹20</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total + 20}</span>
            </div>
            <button onClick={checkout} className="mt-6 w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
