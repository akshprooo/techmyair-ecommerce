import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-5 gap-5 sm:gap-0">
      {/* Left: Image + Details */}
      <div className="flex items-center gap-5 flex-1">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-24 h-24 object-contain rounded-lg border border-gray-200 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold font-montserrat text-gray-900">
            {item.name}
          </h3>
          <p className="text-amber-600 font-extrabold text-xl mt-1">₹{item.price}</p>
        </div>
      </div>

      {/* Right: Quantity Controls and Remove Button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
          <button
            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
            className="px-4 py-2 hover:bg-gray-200 transition text-gray-700 font-semibold"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-6 py-2 text-center w-12 font-medium text-gray-900 select-none">
            {item.qty}
          </span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="px-4 py-2 hover:bg-gray-200 transition text-gray-700 font-semibold"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 shadow-md transition"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
