// src/App.js
import React, { useState } from 'react';
import './App.css';
import ShoppingCart from './ShoppingCart';
import sneakersImage from './images/sneakers.jpeg';
import laptopImage from './images/laptop.jpeg';
import coffeeMakerImage from './images/coffee.jpeg';
import smartphoneImage from './images/smartphone.jpeg';
import headphonesImage from './images/headphones.jpeg';
import watchImage from './images/watch.jpeg';
import speakerImage from './images/speaker.jpeg';

const productsData = [
  {
    id: 1,
    name: 'Laptop',
    image: laptopImage,
    price: 1200,
    rating: 4.5,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Sneakers',
    image: sneakersImage,
    price: 800,
    rating: 4.2,
    category: 'Fashion',
  },
  {
    id: 3,
    name: 'Coffee Maker',
    image: coffeeMakerImage,
    price: 500,
    rating: 4.7,
    category: 'Home Appliances',
  },
  {
    id: 4,
    name: 'Smartphone',
    image: smartphoneImage,
    price: 1000,
    rating: 4.8,
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'Headphones',
    image: headphonesImage,
    price: 150,
    rating: 4.0,
    category: 'Electronics',
  },
  {
    id: 6,
    name: 'Watch',
    image: watchImage,
    price: 300,
    rating: 4.6,
    category: 'Fashion',
  },
  {
    id: 7,
    name: 'Speaker',
    image: speakerImage,
    price: 250,
    rating: 4.3,
    category: 'Electronics',
  },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const filteredProducts = productsData
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    )
    .map((product) => (
      <div key={product.id} className="product-card">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <div className="product-rating">Rating: {product.rating}</div>
        </div>
        <div className="product-actions">
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <div className="quantity-actions">
            <button onClick={() => decrementQuantity(product.id)}>-</button>
            <span>{(cart.find((item) => item.id === product.id) || {}).quantity || 0}</span>
            <button onClick={() => incrementQuantity(product.id)}>+</button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="app">
      <header>
        <h1>Shopping Cart</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      <nav>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home Appliances">Home Appliances</option>
        </select>
      </nav>
      <main>
        <div className="products">{filteredProducts}</div>
      </main>
      <aside>
        <ShoppingCart cart={cart} />
      </aside>
    </div>
  );
};

export default App;
