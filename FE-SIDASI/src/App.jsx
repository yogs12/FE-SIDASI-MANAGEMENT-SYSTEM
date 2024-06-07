import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Profil from "./common/Profil/Profil";
import Cart from "./common/Cart/Cart";
import OrderCart from "./common/OrderCart/OrderCart";
import Footer from "./common/footer/Footer";
import EditProfil from "./common/Profil/EditProfil";
import axios from 'axios';

// Import komponen admin
import AddProduct from "./admin/components/AddProduct";
import AdminLayout from "./admin/adminLayout";
import DashboardAdmin from "./admin/components/DashboardAdmin";
import ProdukAdmin from "./admin/components/ProdukAdmin";
import PesananAdmin from "./admin/components/PesananAdmin";
import TransaksiAdmin from "./admin/components/TransaksiAdmin";
import RiwayatAdmin from "./admin/components/RiwayatAdmin";
import PelangganAdmin from "./admin/components/PelangganAdmin";
import DetailProduct from "./admin/components/DetailProduct";
import EditProduct from "./admin/components/EditProduct";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]); // Tambahkan state orders

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/produks'); // Ganti URL_BACKEND dengan URL backend yang sesuai
      setProducts(response.data.data); // Sesuaikan dengan struktur data dari backend
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:3000/products/produks/${id}`, updatedProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProducts = products.map(product =>
        product.id === id ? response.data.data : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`); // Ganti URL_BACKEND dengan URL backend yang sesuai
      setProducts(products.filter((product) => product.id !== parseInt(id)));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        )
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="beranda" element={<DashboardAdmin />} />
          <Route path="produk" element={<ProdukAdmin products={products} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
          <Route path="produk/add" element={<AddProduct addProduct={addProduct} />} />
          <Route path="produk/detail/:id" element={<DetailProduct />} />
          <Route path="produk/edit/:id" element={<EditProduct products={products} updateProduct={updateProduct} />} />
          <Route path="pesanan" element={<PesananAdmin orders={orders} />} /> {/* Tambahkan prop orders */}
          <Route path="transaksi" element={<TransaksiAdmin />} />
          <Route path="riwayat" element={<RiwayatAdmin />} />
          <Route path="pelanggan" element={<PelangganAdmin />} />
        </Route>
        <Route path="/*" element={
          <>
            <Header CartItem={cartItems} />
            <Routes>
              <Route path="/" element={
                <Pages
                  products={products} // Menggunakan produk yang diambil dari backend
                  addToCart={addToCart}
                />
              } />
              <Route path="/cart" element={
                <Cart
                  cartItems={cartItems}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              } />
              <Route path="/Profil" element={<Profil />} />
              <Route path="/EditProfil" element={<EditProfil />} />
              <Route path="/lacak-pesanan" element={<OrderCart />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
