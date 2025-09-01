import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white/80 border-t-4 border-amber-700 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between">
        <div onClick={() => navigate(`/product/${product.id}`)} className="h-full">
            <div className="img bg-white rounded-b-2xl w-full overflow-hidden h-[60%]"><img className="w-full h-full" src={product.image_url} alt={product.name} /></div>
            <div className="p-4 flex flex-col items-start gap-2">
                <h3 className="text-xl font-semibold font-[montserrat]">{product.name}</h3>
                <p className="text-black bg-amber-7 00 px-1 rounded font-semibold font-[montserrat]">₹{product.price}</p>
            </div>
        </div>
        <button onClick={() => {
          addToCart(product);
          return toast.success("Product added to cart");
        }} className="w-full bg-black text-white py-4 font-[montserrat] font-semibold hover:bg-amber-700 after:content-[''] relative after:absolute after:w-full overflow-hidden after:h-0.5 after:bg-amber-500 after:bottom-0 after:left-0 hover:after:h-2 transition-all after:transition-all cursor-pointer">
            Add To Cart
        </button>
    </div>
  );
};

export default ProductCard;
