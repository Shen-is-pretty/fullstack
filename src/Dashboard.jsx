import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Correct imports
import './Dashboard.css';
import Logout from './Logout';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('clothing');
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock user object for demonstration
  const user = { username: '' };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const clothingItems = [
    { id: 1, name: 'Blue Denim Jacket', price: 500, imgSrc: 'denim.jpg' },
    { id: 2, name: 'Red Hoodie', price: 480, imgSrc: 'hoodie.jpg' },
    { id: 3, name: 'Stylish Hoodie', price: 650, imgSrc: 'hoodie1.jpg' },
    { id: 4, name: 'Hoodie', price: 600, imgSrc: 'hoodie2.jpg' },
    { id: 5, name: 'Hoodie', price: 750, imgSrc: 'hoodie3.jpg' },
    { id: 6, name: 'Hoodie', price: 550, imgSrc: 'hoodie4.jpg' },
    { id: 8, name: '2Pac', price: 350, imgSrc: 'streets.jpg' },
    { id: 9, name: 'Vampire', price: 400, imgSrc: 'tshirt.jpg' }, 
    { id: 10, name: 'Velora', price: 500, imgSrc: 'tshirt2.jpg' },
    { id: 11, name: 'Snugsy', price: 300, imgSrc: 'tshirt3.jpg' },
    { id: 12, name: 'QuirkFit', price: 900, imgSrc: 'tshirt1.jpg' },
    { id: 13, name: 'TeeViBE', price: 1000, imgSrc: 'tshirt4.jpg' },
    { id: 14, name: 'Clothique', price: 1500, imgSrc: 'tshirt5.jpg' },
    { id: 15, name: 'Threadge', price: 500, imgSrc: 'jorts.jpg' },
    { id: 16, name: 'Edgeon', price: 300, imgSrc: 'jorts1.jpg' },
    { id: 17, name: 'Frayva', price: 900, imgSrc: 'jorts2.jpg' },
    { id: 18, name: 'DeniViBE', price: 1000, imgSrc: 'jorts3.jpg' },
    { id: 19, name: 'Frayze', price: 1500, imgSrc: 'jorts4.jpg' },
    { id: 20, name: 'Xylo', price: 500, imgSrc: 'Jeans.jpg' },
    { id: 21, name: 'Leigh', price: 300, imgSrc: 'Jeans1.jpg' },
    { id: 22, name: 'Galactic', price: 900, imgSrc: 'jeans2.jpg' },
    { id: 23, name: 'Supernova', price: 1000, imgSrc: 'jeans4.jpg' },
    { id: 24, name: 'Nebula', price: 1500, imgSrc: 'Jeans3.jpg' },
  ];

  const handleAddToCart = (item) => setCart([...cart, item]);

  const handleRemoveFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert('Your order has been placed!');
    console.log('Order Details:', { name, address, paymentMethod, cart });
    setCart([]);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLedgerClick = () => {
    navigate("/ledger");
  };

  return (
    <>
        {/* Sidebar */}
        <div className="dashboard-container">

        {/* Hamburger Menu */}
        <div
          className="hamburger-menu"
          onClick={toggleSidebar}
          role="button"
          aria-label="Toggle Sidebar"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
          <h2>Store Dashboard</h2>
          <ul>
            <li>
              <a
                href="#clothing-dashboard"
                onClick={() => setActiveSection('clothing')}
                className={activeSection === 'clothing' ? 'active' : ''}
              >
                Clothing Collection
              </a>
            </li>
            <li>
              <a
                href="#cart"
                onClick={() => setActiveSection('cart')}
                className={activeSection === 'cart' ? 'active' : ''}
              >
                Shopping Cart ({cart.length})
              </a>
            </li>
            <li>
              <a
                href="#checkout"
                onClick={() => setActiveSection('checkout')}
                className={activeSection === 'checkout' ? 'active' : ''}
              >
                Checkout
              </a>
            </li>
            <li>
              <a
                href="/ledger"
                onClick={() => navigate("/ledger")}>
                Ledger         
                </a>
            </li>
          </ul>
          <Logout />
          </div>

        {/* Main Content */}
        <div className={`main-content ${isSidebarOpen ? 'sidebar-active' : ''}`}>
          {activeSection === 'clothing' && (
            <section id="clothing-dashboard">
              <h3>"URBAN ViBE: Own the Streets, Define the Trend."</h3>
              <div className="clothing-list">
                {clothingItems.map((item) => (
                  <div key={item.id} className="content-item">
                    <img src={item.imgSrc} alt={item.name} className="clothing-item-img" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>
                        {new Intl.NumberFormat('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        }).format(item.price)}
                      </p>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'cart' && (
            <section id="cart">
              <h3>Your Shopping Cart</h3>
              <div className="cart-list">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img src={item.imgSrc} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>
                          {new Intl.NumberFormat('en-PH', {
                            style: 'currency',
                            currency: 'PHP',
                          }).format(item.price)}
                        </p>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty!</p>
                )}
              </div>
              <div className="cart-total">
                <h4>
                  Total:{" "}
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(cart.reduce((total, item) => total + item.price, 0))}
                </h4>
                <button
                  onClick={() => setActiveSection('checkout')}
                  className="checkout-btn"
                  disabled={cart.length === 0}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </button> 
              </div>
            </section>
          )}

          {activeSection === 'checkout' && (
            <section id="checkout">
              <h3>Checkout</h3>
              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="gcash">GCash</option>
                  <option value="cash-on-delivery">Cash on Delivery</option>                 
                </select>
                <button type="submit">Place Order</button>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

