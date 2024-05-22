import React from "react";
import Home from "../components/MainPage/Home";
import Shop from "../components/shops/Shop";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  // Conditional rendering of components based on availability
  return (
    <>
      <Home CartItem={CartItem} />
      {/* <TopCate />
      <NewArrivals productItems={productItems} addToCart={addToCart} />
      <Discount productItems={productItems} addToCart={addToCart} /> */}
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument />
      <Wrapper />
    </>
  );
};

export default Pages;
