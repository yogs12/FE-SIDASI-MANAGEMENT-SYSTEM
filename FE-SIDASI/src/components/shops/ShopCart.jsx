import React, { useState } from "react";

const ShopCart = ({ shopItems, addToCart }) => {
  const [cartCount, setCartCount] = useState(0); // State untuk melacak jumlah produk di keranjang

  // Fungsi untuk menambah item ke keranjang
  const handleAddToCart = (item) => {
    addToCart(item);
    setCartCount(cartCount + 1); // Menambahkan satu ke jumlah produk di keranjang
  };

  return (
    <>
      {shopItems.map((shopItem, index) => {
        const textColor = shopItem.stok > 0 ? 'green' : 'red';

        return (
          <div className='box' key={index}>
            <div className='product mtop'>
              <div className='img'>
                <span className={`info ${textColor}`}>{shopItem.info}</span>
                <img src={shopItem.cover} alt='' />
                <div className='product-like'>
                  <label>{/* Tidak perlu menampilkan jumlah di sini */}</label> <br />
                  <i className='fa-regular fa-heart'></i>
                </div>
              </div>
              <div className='product-details'>
                <h3>{shopItem.name}</h3>
                <div className='stok'>
                  <p>Stok: <span style={{ color: textColor }}>{shopItem.stok}</span></p>
                </div>
                <div className='price'>
                  <h4>Rp.{shopItem.price}</h4>
                  {/* Mengubah onClick pada button menjadi handleAddToCart */}
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
