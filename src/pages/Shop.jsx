import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

const Shop = () => {
  const {products} = useProducts();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
