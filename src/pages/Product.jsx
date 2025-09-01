import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((p) => String(p.id) === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Mock additional images (you can replace with actual product images)
  const productImages = [
    product.image_url,
    // Add more image URLs if available in your product data
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-black hover:text-amber-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-amber-700" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
              {product.category && (
                <p className="text-amber-700 font-medium mb-2">{product.category}</p>
              )}
              
              {/* Mock Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • 124 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-amber-700">
                  ₹{product.price?.toLocaleString()}
                </span>
                {/* Mock original price */}
                <span className="text-lg text-gray-500 line-through">
                  ₹{Math.round(product.price * 1.2)?.toLocaleString()}
                </span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  17% off
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "High-quality mobile accessory designed to enhance your digital lifestyle. Crafted with premium materials for durability and style."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-black">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-800 transition-colors duration-200"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleAddToCart}
                className="w-full border border-gray-300 text-black py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>

              {/* Secondary Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 border border-gray-300 text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Heart size={16} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 border border-gray-300 text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features/Benefits */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Why choose this product?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="text-amber-700" size={20} />
                  <span className="text-gray-700">Premium build quality and durability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="text-amber-700" size={20} />
                  <span className="text-gray-700">Fast and free delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="text-amber-700" size={20} />
                  <span className="text-gray-700">Easy returns within 30 days</span>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-amber-700">1000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700">4.8★</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700">6 Days</p>
                  <p className="text-sm text-gray-600">Return Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Truck className="text-amber-700 mx-auto mb-4" size={32} />
            <h3 className="font-semibold text-black mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">Free delivery on orders above ₹500</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <Shield className="text-amber-700 mx-auto mb-4" size={32} />
            <h3 className="font-semibold text-black mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure payment processing</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <RotateCcw className="text-amber-700 mx-auto mb-4" size={32} />
            <h3 className="font-semibold text-black mb-2">Easy Returns</h3>
            <p className="text-gray-600 text-sm">Hassle-free returns within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;