import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: fadeIn 0.3s;
`;

const CartContent = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 90%;
  max-width: 600px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  z-index: 2001;
  animation: slideIn 0.3s;
  overflow-y: auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  h3 {
    margin: 0;
  }
`;

const CloseButton = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: white;
  transition: color 0.3s;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const CartBody = styled.div`
  padding: 1.5rem;
`;

const CartItems = styled.div`
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CartItemPrice = styled.div`
  color: #ff6b6b;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 3px;
  transition: background 0.3s;
  
  &:hover {
    background: #e9ecef;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #ff5252;
  }
`;

const CartSummary = styled.div`
  text-align: right;
`;

const CartTotal = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
  width: 100%;
  
  &:hover {
    background: #5a67d8;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  
  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }
`;

const Cart = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();

  // Format price with INR symbol (prices are already in INR)
  const formatINRPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = getTotalPrice();
    alert(`Order placed successfully! Total: ${formatINRPrice(total)}`);
    // Here you would typically send the order to your backend
    toggleCart();
  };

  if (!isOpen) return null;

  return (
    <>
      <CartOverlay isOpen={isOpen} onClick={toggleCart} />
      <CartContent>
        <CartHeader>
          <h3>Shopping Cart</h3>
          <CloseButton onClick={toggleCart}>&times;</CloseButton>
        </CartHeader>
        <CartBody>
          <CartItems>
            {items.length === 0 ? (
              <EmptyCart>
                <i className="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
              </EmptyCart>
            ) : (
              items.map(item => (
                <CartItem key={item.id}>
                  <CartItemImage src={item.image} alt={item.name} />
                  <CartItemInfo>
                    <CartItemTitle>{item.name}</CartItemTitle>
                    <CartItemPrice>{formatINRPrice(item.price)}</CartItemPrice>
                    <QuantityControls>
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </QuantityButton>
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </QuantityButton>
                    </QuantityControls>
                  </CartItemInfo>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    Remove
                  </RemoveButton>
                </CartItem>
              ))
            )}
          </CartItems>
          {items.length > 0 && (
            <CartSummary>
              <CartTotal>Total: {formatINRPrice(getTotalPrice())}</CartTotal>
              <CheckoutButton onClick={handleCheckout}>
                Proceed to Checkout
              </CheckoutButton>
            </CartSummary>
          )}
        </CartBody>
      </CartContent>
    </>
  );
};

export default Cart;
