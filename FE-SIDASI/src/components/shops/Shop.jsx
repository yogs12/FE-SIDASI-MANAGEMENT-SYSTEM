import React, { useState } from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
import Sdata from "./Sdata";

const Shop = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory
    ? Sdata.shopItems.filter((item) => item.category === selectedCategory)
    : Sdata.shopItems;

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
              <div className='heading-right row '>
                <span>Lihat Semua</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <ShopCart addToCart={addToCart} shopItems={filteredItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
