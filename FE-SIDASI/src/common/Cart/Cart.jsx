import React, { useEffect, useState } from "react";
import "./style.css";
import axios from 'axios';

const Cart = ({ cartItems, addToCart, decreaseQty, removeFromCart }) => {
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

  const totalPrice = cartItems.reduce((price, item) => {
    const product = products.find(product => product.id === item.id);
    return price + item.qty * (product ? product.harga : 0);
  }, 0);

  const removeItem = (item) => {
    removeFromCart(item);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Add id_bookings to the form data
    cartItems.forEach(item => {
      formData.append('id_bookings', item.id_bookings);
      formData.append('id_user', item.id_user);
      formData.append('nama_user', item.nama_user);
      formData.append('tanggal_booking', new Date().toISOString().slice(0, 10)); // Example format
      formData.append('status_pembayaran', 'pending'); // Example status
    });

    try {
      const response = await axios.post('http://localhost:3000/api/bookings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert("Pesanan berhasil ditambahkan!");
      } else {
        alert("Terjadi kesalahan saat menambahkan pesanan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <section className="cart-items">
      <div className="container d_flex">
        <div className="cart-details">
          {cartItems.length === 0 && <h1 className="no-items product">Tidak ada pesanan</h1>}
          {cartItems.map((item) => {
            const product = products.find(product => product.id === item.id);
            const productQty = product ? product.harga * item.qty : 0;
            return (
              <div className="cart-list product d_flex" key={item.id}>
                <div className="imgcart">
                  <img src={`http://localhost:3000/${item.foto_produk}`} alt="" />
                </div>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <h4>Rp.{product ? product.harga : 0} * {item.qty}<span>Rp.{productQty}</span></h4>
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

        <div className="cart-summary">
          <div className="cart-total product">
            <h2>Total Pembayaran</h2>
            <div className="d_flex">
              <h4>Harga Total :</h4>
              <h3>Rp.{cartItems.length === 0 ? '0' : totalPrice}</h3>
            </div>
          </div>

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
  );
};

export default Cart;
