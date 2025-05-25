import React, { useState, useEffect } from 'react';
import './ProductItem.css';

const HahishukProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products/hahishuk');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: `hahishuk-${product.hahishuk_site_product_id}`,
      name: product.productname,
      productId: product.hahishuk_site_product_id,
      quantity: 1,
      price: product.current_price,
      retailer: 'Hahishuk',
      imageUrl: product.imageurl
    };
    onAddToCart(cartItem);
  };

  if (loading) return <div className="loading">Loading Hahishuk products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Hahishuk Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.hahishuk_site_product_id} className="product-item">
            {product.imageurl && (
              <img 
                src={product.imageurl} 
                alt={product.productname}
                className="product-image"
              />
            )}
            <h3>{product.productname}</h3>
            <p className="price">₪{product.current_price}</p>
            <p className="stock-status">
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </p>
            <button 
              onClick={() => handleAddToCart(product)}
              disabled={product.stock_status !== 'instock'}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HahishukProductList;