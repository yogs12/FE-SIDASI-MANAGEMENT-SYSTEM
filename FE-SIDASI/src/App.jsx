import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Profil from "./common/Profil/Profil";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import OrderCart from "./common/OrderCart/OrderCart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import EditProfil from "./common/Profil/editprofil";


function App() {
  const [cartItems, setCartItems] = useState([]);

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
    <>
      <Router>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <>
                <Header_admin />
                <Routes>
                  <Route path="dashboard" element={<Dashboard_admin />} />
                  {/* Tambahkan rute admin lainnya di sini */}
                </Routes>
              </>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Header cartItems={cartItems} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Pages
                        productItems={Data.productItems}
                        addToCart={addToCart}
                        shopItems={Sdata.shopItems}
                      />
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <Cart
                        cartItems={cartItems}
                        addToCart={addToCart}
                        decreaseQty={decreaseQty}
                      />
                    }
                  />
                  <Route path="/Profil" element={<Profil />} />
                  <Route path="/EditProfil" element={<EditProfil />} />
                  <Route path="/lacak-pesanan" element={<OrderCart />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
