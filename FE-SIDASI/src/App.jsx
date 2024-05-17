import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Mengubah Switch menjadi Routes
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data"; // Assuming Data component provides productItems
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata"; // Assuming Sdata component provides shopItems

function App() {
  // Initialize state for cart items using useState
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If it exists, update its quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // If it doesn't exist, add it to the cart with an initial quantity of 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQty = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem.qty === 1) {
      // If the quantity is 1, remove the item from the cart
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      // If the quantity is greater than 1, decrease its quantity
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
        <Header cartItems={cartItems} />
        <Routes> {/* Mengubah Switch menjadi Routes */}
          <Route path="/" element={<Pages productItems={Data.productItems} addToCart={addToCart} shopItems={Sdata.shopItems} />} /> {/* Menggunakan prop "element" untuk menentukan komponen */}
          <Route path="/cart" element={<Cart cartItems={cartItems} addToCart={addToCart} decreaseQty={decreaseQty} />} /> {/* Menggunakan prop "element" untuk menentukan komponen */}
        </Routes> {/* Mengubah Switch menjadi Routes */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
