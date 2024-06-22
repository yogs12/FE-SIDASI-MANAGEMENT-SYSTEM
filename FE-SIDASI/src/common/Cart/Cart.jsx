import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../auth/UserContext'; // Ensure this path is correct

const Cart = ({ cartItems, addToCart, decreaseQty, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user from context

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
    const product = products.find(product => product.id_produk === item.id_produk);
    return price + item.qty * (product ? product.harga : 0);
  }, 0);

  const removeItem = (item) => {
    removeFromCart(item);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!user || !user.id_user) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();
    formData.append('id_user', user.id_user); // Use actual user ID from context
    formData.append('tanggal_booking', new Date().toISOString().slice(0, 10));
    formData.append('status_pembayaran', 'Pending');

    const productsData = cartItems.map(item => ({
      id_produk: item.id_produk,
      quantity: item.qty
    }));
    formData.append('products', JSON.stringify(productsData));

    const screenshot = event.target.elements.screenshot.files[0];
    if (screenshot) {
      formData.append('bukti_pembayaran', screenshot);
    }

    try {
      const response = await axios.post('http://localhost:3000/bookings/bookings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert("Pesanan berhasil ditambahkan!");
        navigate("/lacak-pesanan");
      } else {
        alert("Terjadi kesalahan saat menambahkan pesanan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan saat menambahkan pesanan.");
    }
  };

  return (
    <section className="cart-items">
      <div className="container d_flex">
        <div className="cart-details">
          {cartItems.length === 0 && <h1 className="no-items product">Tidak ada pesanan</h1>}
          {cartItems.map((item) => {
            const product = products.find(product => product.id_produk === item.id_produk);
            const productQty = product ? product.harga * item.qty : 0;
            return (
              <div className="cart-list product d_flex" key={item.id_produk}>
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
