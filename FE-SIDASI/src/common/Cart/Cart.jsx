import React from "react";
import "./style.css";

const Cart = ({ cartItems, addToCart, decreaseQty, removeFromCart }) => {
  const totalPrice = cartItems.reduce((price, item) => price + item.qty * item.price, 0);

  const removeItem = (item) => {
    removeFromCart(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Screenshot submitted");
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          {/* Cart details */}
          <div className="cart-details">
            {cartItems.length === 0 && <h1 className="no-items product">Tidak ada pesanan</h1>}
            {cartItems.map((item) => {
              const productQty = +item.price * item.qty;
              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="imgcart">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      Rp.{item.price} * {item.qty}
                      <span>Rp.{productQty}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart" onClick={() => removeItem(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart summary and admin information */}
          <div className="cart-summary">
            <div className="cart-total product">
              <h2>Total Pembayaran</h2>
              <div className="d_flex">
                <h4>Harga Total :</h4>
                <h3>Rp.{cartItems.length === 0 ? '0' : totalPrice}</h3>
              </div>
            </div>

            {/* Admin information */}
            <div className="admin-info">
              <h2>Informasi Pembayaran</h2>
              <p>Nomor Rekening: XXXXXXXX</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="screenshot">Tangkap Layar:</label>
                <input type="file" id="screenshot" name="screenshot" accept="image/*" required />
                <button type="submit">Kirim</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
