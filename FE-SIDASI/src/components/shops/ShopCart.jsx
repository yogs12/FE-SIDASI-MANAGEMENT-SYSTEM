import React, { useState } from "react";

const ShopCart = ({ shopItems, addToCart }) => {
  const [cartCount, setCartCount] = useState(0); // State untuk melacak jumlah produk di keranjang

  // Fungsi untuk menambah item ke keranjang
  const handleAddToCart = (item) => {
    setCartCount(cartCount + 1); 
    addToCart(item);
    console.log(cartCount)// Menambahkan satu ke jumlah produk di keranjang
  };

  return (
    <>
      {shopItems.map((shopItem, index) => {
        const textColor = shopItem.stok > 0 ? 'green' : 'red';

        return (
          <div className='box' key={index}>
            <div className='product mtop'>
              <div className='img' style={{ position: 'relative' }}>
                <span
                  className={`info ${textColor}`}
                  style={{
                    color: 'white',
                    borderRadius: '8px',
                    backgroundColor: textColor,
                    padding: '2px 8px',
                    position: 'absolute',
                    top: '10px', // Adjust top position
                    left: '10px', // Adjust left position
                  }}
                >
                  {shopItem.info}
                </span>
                <img src={shopItem.cover} alt='' style={{ display: 'block', width: '100%' }} />
              </div>
              <div className='product-details'>
                <h3>{shopItem.name}</h3>
                <div className='stok'>
                  <p>Stok: <span style={{ color: textColor }}>{shopItem.stok}</span></p>
                </div>
                <div className='price'>
                  <h4>Rp.{shopItem.price}</h4>
                  <button onClick={() => handleAddToCart(shopItem)}>
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
