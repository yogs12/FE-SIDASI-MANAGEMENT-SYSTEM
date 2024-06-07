import React, { useState, useEffect } from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
import axios from 'axios';

const Shop = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/produks');
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory
    ? products.filter((item) => item.kategori === selectedCategory)
    : products;

  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Catg onSelectCategory={onSelectCategory} />
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Semua Produk</h2>
              </div>
            </div>
            <div className='product-content grid1'>
              <ShopCart addToCart={addToCart} shopItems={filteredItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
