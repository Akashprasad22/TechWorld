import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { storage } from '../config/storage';
import { formatPrice } from '../data/products';

const CartOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
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
    getTotalPrice,
    isOpen,
    items,
    removeFromCart,
    toggleCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!user) {
      alert('Please login to place an order');
      return;
    }

    // Create order
    const order = {
      id: Date.now().toString(), // Simple order ID
      userEmail: user.email,
      date: new Date().toISOString(),
      status: 'processing', // Initial status
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: getTotalPrice()
    };

    // Save order to localStorage
    const result = storage.saveOrder(order);
    
    if (result.success) {
      // Clear cart after successful order
      clearCart();
      toggleCart();
      
      // Show success message
      alert(`Order placed successfully! Order ID: #${order.id}\nTotal: ${formatPrice(order.total)}\n\nYour order is now being processed.`);
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isOpen) {
    return null;
  }

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
              items.map((item) => (
                <CartItem key={item.id}>
                  <CartItemImage src={item.image} alt={item.name} />
                  <CartItemInfo>
                    <CartItemTitle>{item.name}</CartItemTitle>
                    <CartItemPrice>{formatPrice(item.price)}</CartItemPrice>
                    <QuantityControls>
                      <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </QuantityButton>
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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
              <CartTotal>Total: {formatPrice(getTotalPrice())}</CartTotal>
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
