import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const CartSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .item-details {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    p {
      margin: 0 0 0.5rem 0;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .item-price {
    font-weight: bold;
    color: #667eea;
    font-size: 1.1rem;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;

    button {
      width: 24px;
      height: 24px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #f8f9fa;
      }
    }

    span {
      min-width: 20px;
      text-align: center;
      font-size: 0.9rem;
    }
  }

  .remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    margin-top: 0.5rem;

    &:hover {
      background: #c82333;
    }
  }
`;

const SummarySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  
  &.total {
    border-top: 2px solid #667eea;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #667eea;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  h2 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ShopNowButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalAmount, 
    getTotalItems
  } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartSection style={{ textAlign: 'center' }}>
          <EmptyCart>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <ShopNowButton onClick={handleContinueShopping}>
              Continue Shopping
            </ShopNowButton>
          </EmptyCart>
        </CartSection>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartSection>
        <SectionTitle>Shopping Cart ({getTotalItems()} items)</SectionTitle>
        
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>₹{item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
            <div className="item-price">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </CartItem>
        ))}
      </CartSection>

      <SummarySection>
        <SectionTitle>Order Summary</SectionTitle>
        
        <SummaryRow>
          <span>Subtotal:</span>
          <span>₹{getTotalAmount().toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Shipping:</span>
          <span>FREE</span>
        </SummaryRow>
        <SummaryRow>
          <span>Tax:</span>
          <span>₹0.00</span>
        </SummaryRow>
        <SummaryRow className="total">
          <span>Total:</span>
          <span>₹{getTotalAmount().toFixed(2)}</span>
        </SummaryRow>

        <CheckoutButton onClick={handleCheckout}>
          Proceed to Checkout
        </CheckoutButton>
        
        <ContinueShoppingButton onClick={handleContinueShopping}>
          Continue Shopping
        </ContinueShoppingButton>
      </SummarySection>
    </CartContainer>
  );
};

export default CartPage;
