import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Context for global state management
const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

// Sample shoe data with the high-quality images obtained
const SHOES_DATA = [
  {
    id: 1,
    name: "Nike Air Force 1 Shadow",
    brand: "Nike",
    category: "Athletic",
    price: 129.99,
    originalPrice: 149.99,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["White/Blue", "Black", "Red"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    description: "Classic basketball shoe with modern design and superior comfort.",
    rating: 4.8,
    reviews: 156,
    featured: true
  },
  {
    id: 2,
    name: "Athletic Training Shoes",
    brand: "Nike",
    category: "Athletic",
    price: 109.99,
    originalPrice: 119.99,
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
    colors: ["Red", "Black", "White"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "High-performance training shoes for all your workout needs.",
    rating: 4.6,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    name: "Classic White Sneakers",
    brand: "Nike",
    category: "Casual",
    price: 89.99,
    originalPrice: 99.99,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
    colors: ["White/Orange", "Pure White", "Grey"],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    description: "Clean, minimalist design perfect for everyday wear.",
    rating: 4.7,
    reviews: 203,
    featured: false
  },
  {
    id: 4,
    name: "High-Top Classic",
    brand: "Nike",
    category: "Casual",
    price: 95.99,
    originalPrice: 110.99,
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
    colors: ["White", "Black", "Navy"],
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b",
    description: "Timeless high-top sneakers with modern comfort features.",
    rating: 4.5,
    reviews: 67,
    featured: false
  },
  {
    id: 5,
    name: "Modern Lifestyle Sneakers",
    brand: "Adidas",
    category: "Lifestyle",
    price: 119.99,
    originalPrice: 139.99,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Multi", "Black", "White"],
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    description: "Contemporary design meets ultimate comfort for modern living.",
    rating: 4.9,
    reviews: 124,
    featured: true
  },
  {
    id: 6,
    name: "Premium Leather Boots",
    brand: "Timberland",
    category: "Boots",
    price: 189.99,
    originalPrice: 219.99,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Brown", "Black", "Tan"],
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd",
    description: "Handcrafted leather boots built for durability and style.",
    rating: 4.8,
    reviews: 91,
    featured: false
  },
  {
    id: 7,
    name: "Outdoor Hiking Boots",
    brand: "Columbia",  
    category: "Boots",
    price: 159.99,
    originalPrice: 179.99,
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Brown", "Black", "Olive"],
    image: "https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg",
    description: "Rugged outdoor boots designed for trails and adventures.",
    rating: 4.6,
    reviews: 78,
    featured: false
  },
  {
    id: 8,
    name: "Fashion High Heeled Boots",
    brand: "Steve Madden",
    category: "Fashion",
    price: 149.99,
    originalPrice: 169.99,
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    colors: ["Black", "Brown", "Burgundy"],
    image: "https://images.pexels.com/photos/1123985/pexels-photo-1123985.jpeg",
    description: "Stylish high-heeled boots perfect for fashion-forward looks.",
    rating: 4.4,
    reviews: 52,
    featured: false
  }
];

// Header Component
const Header = () => {
  const { cart, user, logout } = useAppContext();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gray-900">👟 SoleStore</div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 font-medium">Products</Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900 font-medium">Categories</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-700 hover:text-gray-900"
            >
              🛒
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Hi, {user.name}</span>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const featuredShoes = SHOES_DATA.filter(shoe => shoe.featured);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredShoes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredShoes.length]);

  return (
    <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Step Into Style</h1>
          <p className="text-xl mb-8">Discover the perfect shoes for every occasion</p>
          <Link 
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-end pr-20">
        <img 
          src={featuredShoes[currentSlide]?.image}
          alt="Featured shoe"
          className="h-80 w-80 object-cover rounded-lg shadow-2xl opacity-20"
        />
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ shoe }) => {
  const { addToCart, addToWishlist, wishlist } = useAppContext();
  const isWishlisted = wishlist.some(item => item.id === shoe.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={shoe.image} 
          alt={shoe.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => addToWishlist(shoe)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:bg-red-500 hover:text-white transition-colors`}
        >
          ❤️
        </button>
        {shoe.originalPrice > shoe.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Sale
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{shoe.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{shoe.brand}</p>
        <p className="text-gray-500 text-sm mb-3">{shoe.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(shoe.rating))}
            {'☆'.repeat(5 - Math.floor(shoe.rating))}
          </div>
          <span className="text-gray-600 text-sm ml-2">({shoe.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${shoe.price}</span>
            {shoe.originalPrice > shoe.price && (
              <span className="text-gray-500 line-through">${shoe.originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => addToCart(shoe)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Home Page
const Home = () => {
  const featuredProducts = SHOES_DATA.filter(shoe => shoe.featured);
  const categories = [...new Set(SHOES_DATA.map(shoe => shoe.category))];

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-4">
                  {category === 'Athletic' ? '⚡' : 
                   category === 'Casual' ? '👟' : 
                   category === 'Boots' ? '🥾' : 
                   category === 'Fashion' ? '👠' : '👟'}
                </div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(shoe => (
              <ProductCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Products Page with Filtering
const Products = () => {
  const [filteredShoes, setFilteredShoes] = useState(SHOES_DATA);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 300],
    sortBy: 'name'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = SHOES_DATA;

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(shoe => shoe.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(shoe => shoe.brand === filters.brand);
    }
    if (searchTerm) {
      filtered = filtered.filter(shoe => 
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(shoe => 
      shoe.price >= filters.priceRange[0] && shoe.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredShoes(filtered);
  }, [filters, searchTerm]);

  const categories = [...new Set(SHOES_DATA.map(shoe => shoe.category))];
  const brands = [...new Set(SHOES_DATA.map(shoe => shoe.brand))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={filters.brand}
            onChange={(e) => setFilters({...filters, brand: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShoes.map(shoe => (
          <ProductCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
      
      {filteredShoes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No shoes found matching your criteria</h3>
        </div>
      )}
    </div>
  );
};

// Cart Page
const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useAppContext();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any shoes to your cart yet.</p>
        <Link 
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map(item => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">{item.brand}</p>
              <p className="text-gray-600">Size: {item.selectedSize}</p>
              <p className="text-xl font-bold text-gray-900 mt-2">${item.price}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id, item.selectedSize)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total: ${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/products"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-center hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate('/checkout')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Login/Register Form
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    login({ 
      name: formData.name || formData.email.split('@')[0], 
      email: formData.email 
    });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Simple Checkout Form
const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useAppContext();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock order placement
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between py-2">
              <span>{item.name} (Size: {item.selectedSize}) x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total: ${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment & Shipping</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="px-4 py-2 border rounded-lg" required />
              <input type="text" placeholder="Last Name" className="px-4 py-2 border rounded-lg" required />
            </div>
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Address" className="w-full px-4 py-2 border rounded-lg" required />
            <div className="grid grid-cols-3 gap-4">
              <input type="text" placeholder="City" className="px-4 py-2 border rounded-lg" required />
              <input type="text" placeholder="State" className="px-4 py-2 border rounded-lg" required />
              <input type="text" placeholder="ZIP" className="px-4 py-2 border rounded-lg" required />
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <input type="text" placeholder="Card Number" className="w-full px-4 py-2 border rounded-lg mb-4" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="CVC" className="px-4 py-2 border rounded-lg" required />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Place Order - ${getCartTotal().toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// App Context Provider
const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (shoe, selectedSize = 9) => {
    const existingItem = cart.find(item => item.id === shoe.id && item.selectedSize === selectedSize);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === shoe.id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...shoe, selectedSize, quantity: 1 }]);
    }
  };

  const removeFromCart = (shoeId, selectedSize) => {
    setCart(cart.filter(item => !(item.id === shoeId && item.selectedSize === selectedSize)));
  };

  const updateCartQuantity = (shoeId, selectedSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(shoeId, selectedSize);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === shoeId && item.selectedSize === selectedSize
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addToWishlist = (shoe) => {
    const isAlreadyWishlisted = wishlist.some(item => item.id === shoe.id);
    if (isAlreadyWishlisted) {
      setWishlist(wishlist.filter(item => item.id !== shoe.id));
    } else {
      setWishlist([...wishlist, shoe]);
    }
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    cart,
    wishlist,
    user,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    addToWishlist,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Main App Component
function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;