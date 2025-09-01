import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const foundProduct = products.find((p) => String(p.id) === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-[montserrat]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-center bg-gray-100 p-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-contain max-h-[500px] w-full rounded"
          />
        </div>

        <div className="flex flex-col justify-between p-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-[montserrat] mb-3">
              {product.name}
            </h1>
            <p className="text-lg text-gray-700 mb-4 font-semibold">
              {product.description || "High-quality mobile accessory to enhance your experience."}
            </p>
            <p className="text-2xl font-bold text-amber-700 mb-6">
              ₹{product.price}
            </p>
          </div>

          <button
            onClick={() => {
                addToCart(product);
                return toast.success("Product added to cart");
            }}
            className="w-full bg-black text-white py-3 rounded-md font-semibold font-[montserrat] 
                       hover:bg-amber-700 transition-colors cursor-pointer"
          >
            Add To Cart
          </button>
          <h2 className="text-sm text-gray-400 mt-2 md:text-right font-semibold" >* Head Over To The Cart to Checkout/Confirm Order.</h2>
        </div>
      </div>

      <div className="mt-10 bg-black/90 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold font-[montserrat] mb-4">Why choose this?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Premium build quality and durability</li>
          <li>Designed to complement your mobile lifestyle</li>
          <li>Trusted by thousands of happy customers</li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
