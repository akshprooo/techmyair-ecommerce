import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between bg-white/90 rounded-lg shadow p-4">
      {/* Left: Image + Details */}
      <div className="flex items-center gap-4">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-20 h-20 object-contain rounded-md border"
        />
        <div>
          <h3 className="text-md font-semibold font-[montserrat]">{item.name}</h3>
          <p className="text-amber-700 font-bold">₹{item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            -
          </button>
          <span className="px-3 py-1 text-center w-10">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
