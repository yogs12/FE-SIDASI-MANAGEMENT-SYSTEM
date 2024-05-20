import React, { useState } from "react";

const Catg = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = [
    {
      cateImg: "./images/category/cart_1.png",
      cateName: "Bahan Baku",
    },
    {
      cateImg: "./images/category/cart_2.png",
      cateName: "Makanan",
    },
    {
      cateImg: "./images/category/cart_3.png",
      cateName: "Minuman",
    },
    {
      cateImg: "./images/category/cart_4.png",
      cateName: "Kosmetik",
    },
    {
      cateImg: "./images/category/cart_5.png",
      cateName: "Barang Unik",
    },
    {
      cateImg: "./images/category/cart_6.png",
      cateName: "Elektronik",
    },
  ];

  const handleClick = (categoryName) => {
    setSelectedCategory(categoryName);
    onSelectCategory(categoryName);
  };

  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Kategori </h1>
          <h1>Toko </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div
              className={`box f_flex ${selectedCategory === value.cateName ? 'selected' : ''}`}
              key={index}
              onClick={() => handleClick(value.cateName)}
            >
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Catg;
