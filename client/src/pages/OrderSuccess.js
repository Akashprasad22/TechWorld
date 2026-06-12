import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  background: #f3f3f3;
`;

const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const SuccessCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  color: #111;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  color: #565959;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OrderInfo = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
  
  &:last-child {
    border-bottom: none;
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &.primary {
    background: #ff9900;
    color: #111;
    
    &:hover {
      background: #f3a847;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }
  }
`;

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state || {};

  return (
    <Container>
      <Navbar />
      
      <SuccessContainer>
        <SuccessCard>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessTitle>Order Placed Successfully!</SuccessTitle>
          <SuccessMessage>
            Thank you for your order! We've received your purchase and will begin processing it right away.
            You'll receive an email confirmation shortly with your order details.
          </SuccessMessage>
          
          {orderData.orderId && (
            <OrderInfo>
              <OrderDetail>
                <span>Order ID:</span>
                <span>#{orderData.orderId}</span>
              </OrderDetail>
              <OrderDetail>
                <span>Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </OrderDetail>
              <OrderDetail>
                <span>Payment Method:</span>
                <span>{orderData.paymentMethod || 'N/A'}</span>
              </OrderDetail>
              <OrderDetail>
                <span>Total Amount:</span>
                <span>₹{orderData.totalAmount || '0.00'}</span>
              </OrderDetail>
              <OrderDetail>
                <span>Estimated Delivery:</span>
                <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </OrderDetail>
            </OrderInfo>
          )}
          
          <ActionButtons>
            <Button to="/orders" className="primary">
              View My Orders
            </Button>
            <Button to="/products" className="secondary">
              Continue Shopping
            </Button>
          </ActionButtons>
        </SuccessCard>
      </SuccessContainer>
    </Container>
  );
};

export default OrderSuccess;
