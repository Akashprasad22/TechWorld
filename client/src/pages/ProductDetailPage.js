import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
`;

const ProductInfoContainer = styled.div`
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .stars {
      color: #ffd700;
      font-size: 1.2rem;
    }
    
    .rating-count {
      color: #666;
    }
  }
  
  .price {
    font-size: 2rem;
    font-weight: bold;
    color: #ff6b6b;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .features {
    margin-bottom: 2rem;
    
    h3 {
      color: #333;
      margin-bottom: 1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        
        &:before {
          content: "✓";
          color: #28a745;
          font-weight: bold;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    
    button {
      background: #f8f9fa;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background 0.3s;
      
      &:hover {
        background: #e9ecef;
      }
    }
    
    span {
      padding: 0.5rem 1rem;
      min-width: 50px;
      text-align: center;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s;
    
    &.add-to-cart {
      background: #667eea;
      color: white;
      flex: 1;
      
      &:hover {
        background: #5a67d8;
      }
    }
    
    &.buy-now {
      background: #ff6b6b;
      color: white;
      flex: 1;
      
      &:hover {
        background: #ff5252;
      }
    }
    
    &.back {
      background: #6c757d;
      color: white;
      
      &:hover {
        background: #5a6268;
      }
    }
  }
`;

const ProductDetails = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  .specs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    
    .spec-item {
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 5px;
      
      .spec-label {
        font-weight: bold;
        color: #666;
        margin-bottom: 0.5rem;
      }
      
      .spec-value {
        color: #333;
      }
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

// Mock product data (same as in ProductsPage)
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "phones",
    brand: "apple",
    price: 99999,
    rating: 4.8,
    reviews: 2453,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    image: "/assets/images/iphone.webp",
    features: [
      "A17 Pro chip with 6-core CPU",
      "Titanium design with Dynamic Island",
      "Pro camera system with 5x telephoto",
      "Action button for customization",
      "USB-C connectivity"
    ],
    specifications: {
      "Display": "6.7\" Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Battery": "All-day battery life",
      "Storage": "256GB, 512GB, 1TB options",
      "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "phones",
    brand: "samsung",
    price: 107999,
    rating: 4.7,
    reviews: 1876,
    description: "Premium Android phone with S Pen, 200MP camera, and AMOLED display",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Galaxy+S24+Ultra",
    features: [
      "200MP main camera with 5x optical zoom",
      "S Pen included for productivity",
      "Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 processor",
      "5000mAh battery with fast charging"
    ],
    specifications: {
      "Display": "6.8\" Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main, 50MP Periscope, 12MP Ultra Wide, 10MP Telephoto",
      "Battery": "5000mAh",
      "Storage": "256GB, 512GB, 1TB options",
      "Colors": "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow"
    }
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get product details
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout or cart
    navigate('/cart');
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (halfStar) {
      stars += '☆';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    return stars;
  };

  if (loading) {
    return <LoadingMessage>Loading product details...</LoadingMessage>;
  }

  if (!product) {
    return (
      <div className="container">
        <LoadingMessage>Product not found.</LoadingMessage>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <ProductContainer>
          <ProductImageContainer>
            <img src={product.image} alt={product.name} />
          </ProductImageContainer>
          <ProductInfoContainer>
            <h1>{product.name}</h1>
            <div className="rating">
              <span className="stars">{generateStars(product.rating)}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>
            <div className="price">₹{product.price}</div>
            <div className="description">{product.description}</div>
            
            {product.features && (
              <div className="features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <QuantitySelector>
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </QuantitySelector>
            
            <ActionButtons>
              <button className="add-to-cart" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="back" onClick={() => navigate(-1)}>
                Back
              </button>
            </ActionButtons>
            
            {product.specifications && (
              <ProductDetails>
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <div className="spec-label">{key}</div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </ProductDetails>
            )}
          </ProductInfoContainer>
        </ProductContainer>
      </div>
      <Cart />
    </>
  );
};

export default ProductDetailPage;
