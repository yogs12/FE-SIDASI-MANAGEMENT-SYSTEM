import React from "react";

const ShopCart = ({ shopItems, addToCart }) => {
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
                    top: '10px',
                    left: '10px',
                  }}
                >
                  {shopItem.status}
                </span>
                <img src={`http://localhost:3000${shopItem.foto_produk}`} alt='' style={{ display: 'block', width: '100%' }} />
              </div>
              <div className='product-details'>
                <h3>{shopItem.nama_produk} / {shopItem.satuan} </h3>
                <div className='stok'>
                  <p>Stok: <span style={{ color: textColor }}>{shopItem.stok}</span></p>
                </div>
                <div className='price'>
                  <h4>Rp.{shopItem.harga}</h4>
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
