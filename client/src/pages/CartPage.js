import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';

const CartPageContainer = styled.div`
  padding: 2rem 0;
`;

const CartPageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CartItemsSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  gap: 1.5rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CartItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemDetails = styled.div`
  flex: 1;
  
  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .price {
    color: #ff6b6b;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  button {
    background: #f8f9fa;
    border: 1px solid #ddd;
    width: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    
    &:hover {
      background: #e9ecef;
    }
  }
  
  span {
    min-width: 40px;
    text-align: center;
    font-weight: bold;
  }
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #c82333;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  h2 {
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &.total {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
    padding-top: 1rem;
    border-top: 2px solid #eee;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
  margin-top: 1.5rem;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  i {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 2rem;
  }
  
  h2 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const CartPage = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getTotalItems,
    clearCart
  } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = getTotalPrice();
    const itemCount = getTotalItems();
    alert(`Order placed successfully! ${itemCount} items - Total: ₹${total.toFixed(2)}`);
    clearCart();
    // Here you would typically send the order to your backend
    window.location.href = '/';
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <>
        <CartPageContainer>
          <div className="container">
            <EmptyCart>
              <i className="fas fa-shopping-cart"></i>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any products to your cart yet.</p>
              <ContinueShoppingButton onClick={() => window.location.href = '/'}>
                Continue Shopping
              </ContinueShoppingButton>
            </EmptyCart>
          </div>
        </CartPageContainer>
        <Cart />
      </>
    );
  }

  return (
    <>
      <CartPageContainer>
        <div className="container">
          <CartPageHeader>
            <h1>Shopping Cart</h1>
            <p>{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart</p>
          </CartPageHeader>
          
          <CartContent>
            <CartItemsSection>
              {items.map(item => (
                <CartItem key={item.id}>
                  <CartItemImage src={item.image} alt={item.name} />
                  <CartItemDetails>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="price">₹{item.price}</div>
                    <QuantityControls>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </QuantityControls>
                  </CartItemDetails>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    Remove
                  </RemoveButton>
                </CartItem>
              ))}
            </CartItemsSection>
            
            <CartSummary>
              <h2>Order Summary</h2>
              <SummaryRow>
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax:</span>
                <span>₹{tax.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow className="total">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </SummaryRow>
              <CheckoutButton onClick={handleCheckout}>
                Proceed to Checkout
              </CheckoutButton>
              <ContinueShoppingButton onClick={() => window.location.href = '/'}>
                Continue Shopping
              </ContinueShoppingButton>
            </CartSummary>
          </CartContent>
        </div>
      </CartPageContainer>
      <Cart />
    </>
  );
};

export default CartPage;
