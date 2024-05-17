import React, { useState } from "react";

const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {shopItems.map((shopItem, index) => {
        // Tentukan warna teks berdasarkan ketersediaan stok
        const textColor = shopItem.stok > 0 ? 'green' : 'red';

        return (
          <div className='box' key={index}>
            <div className='product mtop'>
              <div className='img'>
                {/* Ganti className dan tentukan warna berdasarkan stok */}
                <span className={`info ${textColor}`}>{shopItem.info}</span>
                <img src={shopItem.cover} alt='' />
                <div className='product-like'>
                  <label>{count}</label> <br />
                  <i className='fa-regular fa-heart' onClick={increment}></i>
                </div>
              </div>
              <div className='product-details'>
                <h3>{shopItem.name}</h3>
                <div className='stok'>
                  <p>Stok: <span style={{ color: textColor }}>{shopItem.stok}</span></p>
                </div>
                <div className='price'>
                  <h4>Rp.{shopItem.price}</h4>
                  <button onClick={() => addToCart(shopItem)}>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
