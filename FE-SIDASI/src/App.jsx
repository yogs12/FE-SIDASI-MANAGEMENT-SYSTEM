import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Profil from "./common/Profil/Profil";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import OrderCart from "./common/OrderCart/OrderCart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import EditProfil from "./common/Profil/EditProfil";

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
  const [products, setProducts] = useState(Sdata.shopItems);
  const [cartItems, setCartItems] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== parseInt(id)));
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
          <Route path="produk/detail/:id" element={<DetailProduct products={products} />} />
          <Route path="produk/edit/:id" element={<EditProduct products={products} updateProduct={updateProduct} />} />
          <Route path="pesanan" element={<PesananAdmin />} />
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
                  productItems={Data.productItems}
                  addToCart={addToCart}
                  shopItems={Sdata.shopItems}
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
