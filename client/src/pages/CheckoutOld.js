import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  .item-details {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 0.95rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.85rem;
    }
  }

  .item-price {
    font-weight: bold;
    color: #667eea;
    font-size: 1rem;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  
  &.total {
    border-top: 2px solid #667eea;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #667eea;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
    font-size: 0.9rem;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
`;

const PaymentMethodsContainer = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaymentMethod = styled.div`
  border: 2px solid ${props => props.selected ? '#667eea' : '#e0e0e0'};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
  }

  .payment-header {
    display: flex;
    align-items: center;
    gap: 1rem;

    .payment-icon {
      font-size: 1.5rem;
    }

    .payment-info {
      flex: 1;

      h4 {
        margin: 0 0 0.25rem 0;
        color: #333;
        font-size: 1rem;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.85rem;
      }
    }

    .radio-button {
      width: 20px;
      height: 20px;
      border: 2px solid ${props => props.selected ? '#667eea' : '#ddd'};
      border-radius: 50%;
      background: ${props => props.selected ? '#667eea' : 'white'};
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
        display: ${props => props.selected ? 'block' : 'none'};
      }
    }
  }

  .payment-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    display: ${props => props.selected ? 'block' : 'none'};
  }

  .payment-options {
    display: grid;
    gap: 0.5rem;

    .option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background 0.3s ease;

      &:hover {
        background: #f8f9fa;
      }

      i {
        color: #667eea;
        width: 20px;
      }

      span {
        font-size: 0.85rem;
        color: #555;
      }
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CODButton = styled(Button)`
  background: linear-gradient(135deg, #28a745, #20c997);
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 6px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #155724;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 6px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getTotalAmount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    loadPaymentMethods();
    
    // Load user's saved address if available
    if (user.userData?.address) {
      setShippingAddress(user.userData.address);
    }
  }, [user, cartItems, navigate]);

  const loadPaymentMethods = async () => {
    try {
      const response = await axios.get('/api/payment/methods');
      if (response.data.success) {
        setPaymentMethods(response.data.paymentMethods);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  };

  const handlePaymentMethodSelect = (methodId, type = '') => {
    setSelectedPaymentMethod(methodId);
    setSelectedPaymentType(type);
    setError('');
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      setError('Please fill in all shipping address fields');
      return false;
    }

    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      return false;
    }

    return true;
  };

  const handleRazorpayPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Create Razorpay order
      const orderResponse = await axios.post('/api/payment/create-order', {
        amount: getTotalAmount(),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          user_id: user._id,
          items_count: cartItems.length
        }
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create payment order');
      }

      const { order, key_id } = orderResponse.data;

      // Initialize Razorpay checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'TechHub',
        description: 'Order Payment for Electronics',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment and create order
            const verifyResponse = await axios.post('/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                user: user._id,
                items: cartItems.map(item => ({
                  product: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image
                })),
                totalAmount: getTotalAmount(),
                shippingAddress,
                paymentDetails: {
                  method: selectedPaymentType,
                  type: 'online'
                }
              }
            });

            if (verifyResponse.data.success) {
              setSuccess('Payment successful! Order placed successfully.');
              clearCart();
              setTimeout(() => {
                navigate('/orders');
              }, 2000);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment cancelled. Please try again.');
          },
          escape: true,
          backdropclose: true
        },
        prefill: {
          name: user.userData?.name || user.email.split('@')[0],
          email: user.email,
          contact: user.userData?.phone || ''
        },
        theme: {
          color: '#667eea'
        },
        notes: {
          address: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/payment/cod-order', {
        user: user._id,
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getTotalAmount(),
        shippingAddress,
        paymentDetails: {
          method: 'cash_on_delivery',
          type: 'cod'
        }
      });

      if (response.data.success) {
        setSuccess('Order placed successfully! You will pay when you receive your order.');
        clearCart();
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to place COD order');
      }
    } catch (error) {
      console.error('COD order error:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethods = () => {
    return paymentMethods.map((method) => (
      <PaymentMethod
        key={method.id}
        selected={selectedPaymentMethod === method.id}
        onClick={() => handlePaymentMethodSelect(method.id)}
      >
        <div className="payment-header">
          <div className="payment-icon">{method.icon}</div>
          <div className="payment-info">
            <h4>{method.name}</h4>
            <p>{method.description}</p>
          </div>
          <div className="radio-button" />
        </div>
        
        {method.id === 'online' && selectedPaymentMethod === 'online' && (
          <div className="payment-details">
            <div className="payment-options">
              {method.methods.map((paymentType) => (
                <div key={paymentType.type} className="option">
                  <i className={paymentType.icon}></i>
                  <span>{paymentType.name}</span>
                  {paymentType.apps && (
                    <small style={{ marginLeft: 'auto', color: '#999' }}>
                      {paymentType.apps.join(', ')}
                    </small>
                  )}
                  {paymentType.cards && (
                    <small style={{ marginLeft: 'auto', color: '#999' }}>
                      {paymentType.cards.join(', ')}
                    </small>
                  )}
                  {paymentType.banks && (
                    <small style={{ marginLeft: 'auto', color: '#999' }}>
                      +{paymentType.banks.length} banks
                    </small>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {method.id === 'cod' && selectedPaymentMethod === 'cod' && (
          <div className="payment-details">
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              <i className="fas fa-info-circle"></i> {method.note}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              Please keep the exact amount ready for delivery.
            </p>
          </div>
        )}
      </PaymentMethod>
    ));
  };

  return (
    <CheckoutContainer>
      <Section>
        <SectionTitle>
          <i className="fas fa-map-marker-alt"></i>
          Shipping Address
        </SectionTitle>
        
        <FormGroup>
          <label>Street Address *</label>
          <input
            type="text"
            value={shippingAddress.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            placeholder="Enter your street address"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>City *</label>
          <input
            type="text"
            value={shippingAddress.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            placeholder="Enter your city"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>State *</label>
          <input
            type="text"
            value={shippingAddress.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            placeholder="Enter your state"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>ZIP Code *</label>
          <input
            type="text"
            value={shippingAddress.zipCode}
            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            placeholder="Enter your ZIP code"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Country</label>
          <input
            type="text"
            value={shippingAddress.country}
            onChange={(e) => handleAddressChange('country', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>
          <i className="fas fa-shopping-bag"></i>
          Order Summary
        </SectionTitle>
        
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="item-price">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </CartItem>
        ))}

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

        <SectionTitle style={{ marginTop: '2rem' }}>
          <i className="fas fa-credit-card"></i>
          Payment Method
        </SectionTitle>
        
        {renderPaymentMethods()}

        {error && (
          <ErrorMessage>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </ErrorMessage>
        )}
        
        {success && (
          <SuccessMessage>
            <i className="fas fa-check-circle"></i>
            {success}
          </SuccessMessage>
        )}

        {selectedPaymentMethod === 'cod' ? (
          <CODButton
            onClick={handleCODOrder}
            disabled={loading || !selectedPaymentMethod}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Placing Order...
              </>
            ) : (
              <>
                <i className="fas fa-money-bill-wave"></i>
                Place COD Order
              </>
            )}
          </CODButton>
        ) : (
          <Button
            onClick={handleRazorpayPayment}
            disabled={loading || !selectedPaymentMethod}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-lock"></i>
                Pay Now
              </>
            )}
          </Button>
        )}
      </Section>
    </CheckoutContainer>
  );
};

export default Checkout;
