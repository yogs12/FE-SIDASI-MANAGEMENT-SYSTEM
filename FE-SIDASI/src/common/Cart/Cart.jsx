import React from "react";
import "./style.css";

const Cart = ({ cartItems, addToCart, decreaseQty }) => {
  // Step 7: Calculate total price of items
  const totalPrice = cartItems.reduce((price, item) => price + item.qty * item.price, 0);

  // Function to handle submission of screenshot
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic here to handle submission of screenshot
    console.log("Screenshot submitted");
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          {/* Cart details */}
          <div className="cart-details">
            {cartItems.length === 0 && <h1 className="no-items product">No Items are added in Cart</h1>}

            {cartItems.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      Rp.{item.price} * {item.qty}
                      <span>Rp.{productQty}.000</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    {/* Remove item button */}
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* Increment and decrement buttons */}
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          {/* Cart summary */}
          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>Rp.{cartItems.length === 0 ? '0.000' : totalPrice}.000</h3>
            </div>
          </div>

          {/* Admin information and screenshot submission */}
          <div className="admin-info">
            <h2>Admin Information</h2>
            <p>Nomor Rekening: XXXXXXXX</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="screenshot">Screenshot:</label>
              <input type="file" id="screenshot" name="screenshot" accept="image/*" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
