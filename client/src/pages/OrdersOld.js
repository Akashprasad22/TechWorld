import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage } from '../config/storage';
import { formatPrice } from '../data/products';

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const OrdersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const OrdersTitle = styled.h1`
  color: #1a1a2e;
  font-size: 2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-left: 4px solid ${props => props.statusColor || '#667eea'};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const OrderId = styled.div`
  font-weight: 600;
  color: #1a1a2e;
  font-size: 1.1rem;
`;

const OrderDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const OrderStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.statusColor || '#f8f9fa'};
  color: white;
`;

const OrderItems = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  color: #ff6b6b;
  font-weight: bold;
`;

const ItemQuantity = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  font-weight: 600;
  font-size: 1.1rem;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: #1a1a2e;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ShopButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
`;

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadOrders();
  }, [user, navigate]);

  const loadOrders = () => {
    try {
      const userOrders = storage.getUserOrders(user.email) || [];
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'processing': return '#ffc107';
      case 'shipped': return '#17a2b8';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <OrdersContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#667eea' }}></i>
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading orders...</p>
        </div>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle>
          <i className="fas fa-shopping-bag"></i>
          My Orders
        </OrdersTitle>
        <BackButton onClick={() => navigate('/profile')}>
          <i className="fas fa-arrow-left"></i>
          Back to Profile
        </BackButton>
      </OrdersHeader>

      {orders.length === 0 ? (
        <EmptyOrders>
          <i className="fas fa-shopping-bag"></i>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <ShopButton onClick={() => navigate('/')}>
            <i className="fas fa-shopping-cart"></i>
            Start Shopping
          </ShopButton>
        </EmptyOrders>
      ) : (
        <OrdersGrid>
          {orders.map((order) => (
            <OrderCard key={order.id} statusColor={getStatusColor(order.status)}>
              <OrderHeader>
                <div>
                  <OrderId>Order #{order.id}</OrderId>
                  <OrderDate>{formatDate(order.date)}</OrderDate>
                </div>
                <OrderStatus statusColor={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </OrderStatus>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <ItemImage src={item.image} alt={item.name} />
                    <ItemInfo>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                      <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                    </ItemInfo>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderTotal>
                <span>Total ({order.items.length} items)</span>
                <span>{formatPrice(order.total)}</span>
              </OrderTotal>
            </OrderCard>
          ))}
        </OrdersGrid>
      )}
    </OrdersContainer>
  );
};

export default Orders;
