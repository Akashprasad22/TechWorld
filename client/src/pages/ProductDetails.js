import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem;
  }
`;

const ProductImage = styled.div`
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductInfo = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .price {
    font-size: 1.5rem;
    color: #667eea;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .stock-info {
    color: #28a745;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .out-of-stock {
    color: #dc3545;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  label {
    font-weight: 500;
    color: #333;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;

    button {
      width: 40px;
      height: 40px;
      border: none;
      background: #f8f9fa;
      cursor: pointer;
      font-size: 1.2rem;
      transition: background 0.3s ease;

      &:hover {
        background: #e9ecef;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    span {
      width: 60px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
`;

const ActionButtons = styled.div`
  display: grid;
  gap: 1rem;

  button {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const BuyNowButton = styled.button`
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 6px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    setError('');

    try {
      await addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      
      // Success feedback
      setAddingToCart(false);
      // You could show a toast notification here
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add to cart');
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBuyingNow(true);
    setError('');

    try {
      // Add product to cart first
      await addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      
      // Navigate to checkout
      navigate('/checkout');
      
    } catch (error) {
      console.error('Error with buy now:', error);
      setError('Failed to proceed to checkout');
      setBuyingNow(false);
    }
  };

  if (loading) {
    return (
      <ProductContainer>
        <div>Loading product details...</div>
      </ProductContainer>
    );
  }

  if (!product) {
    return (
      <ProductContainer>
        <div>Product not found</div>
      </ProductContainer>
    );
  }

  const isInStock = product.stock > 0;

  return (
    <ProductContainer>
      <ProductImage>
        <img src={product.image} alt={product.name} />
      </ProductImage>
      
      <ProductInfo>
        <h1>{product.name}</h1>
        
        <div className="price">
          ₹{product.price.toFixed(2)}
        </div>
        
        <div className={`stock-info ${!isInStock ? 'out-of-stock' : ''}`}>
          {isInStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </div>
        
        <div className="description">
          {product.description}
        </div>
        
        <QuantitySelector>
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (product.stock || 10)}
            >
              +
            </button>
          </div>
        </QuantitySelector>
        
        <ActionButtons>
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!isInStock || addingToCart}
          >
            {addingToCart ? (
              <>
                <LoadingSpinner />
                Adding...
              </>
            ) : (
              <>
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </>
            )}
          </AddToCartButton>
          
          <BuyNowButton
            onClick={handleBuyNow}
            disabled={!isInStock || buyingNow}
          >
            {buyingNow ? (
              <>
                <LoadingSpinner />
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-bolt"></i>
                Buy Now
              </>
            )}
          </BuyNowButton>
        </ActionButtons>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductDetails;
