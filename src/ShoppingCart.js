
import React from 'react';

const ShoppingCart = ({ cart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price * item.quantity}</span>
            <span>Quantity: {item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
