import React, { useEffect } from 'react'
import { supabase } from '../supabaseClient';
import { createContext, useContext, useState } from 'react';

const   ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data, error } = await supabase.from('Products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext;

export const useProducts = () => useContext(ProductContext);