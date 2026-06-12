import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import OrderCard from '../components/OrderCard';
import { mockOrders, orderFilters } from '../data/orders';

const Page = styled.div`
  min-height: calc(100vh - 120px);
  background:
    radial-gradient(circle at top, rgba(255, 216, 20, 0.08), transparent 30%),
    linear-gradient(180deg, #f6f8fb 0%, #eef2f7 100%);
`;

const OrdersContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const HeroTitle = styled.div`
  h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 2.8rem);
    color: #111827;
  }

  p {
    margin: 0.55rem 0 0;
    color: #475569;
    font-size: 1rem;
  }
`;

const QuickStat = styled.div`
  min-width: 250px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.1rem 1.25rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);

  strong {
    display: block;
    font-size: 1.8rem;
    color: #111827;
  }

  span {
    color: #64748b;
    font-size: 0.95rem;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button`
  border: 1px solid ${props => (props.$active ? '#111827' : '#d5d9d9')};
  background: ${props => (props.$active ? '#131921' : 'white')};
  color: ${props => (props.$active ? 'white' : '#111827')};
  border-radius: 999px;
  padding: 0.8rem 1.05rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const OrdersList = styled.div`
  display: grid;
  gap: 1rem;
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #d5d9d9;
  padding: 3rem 1.5rem;
  text-align: center;
  color: #475569;

  h2 {
    margin: 0 0 0.7rem;
    color: #111827;
  }
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 999px;
  background: #ffd814;
  color: #111827;
  min-height: 42px;
  padding: 0.75rem 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const InlineNotice = styled.div`
  margin-bottom: 1rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  border-radius: 14px;
  padding: 0.95rem 1rem;
  font-weight: 600;
`;

const DetailPanel = styled.div`
  background: white;
  border: 1px solid #d5d9d9;
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);

  h2 {
    margin: 0 0 0.5rem;
    color: #111827;
  }

  p {
    margin: 0.35rem 0;
    color: #475569;
  }
`;

const LoadingShell = styled.div`
  display: grid;
  gap: 1rem;
`;

const SkeletonCard = styled.div`
  height: 220px;
  border-radius: 20px;
  background: linear-gradient(90deg, #edf2f7 25%, #f8fafc 37%, #edf2f7 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const Orders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let timer;
    setLoading(true);
    timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timeout = setTimeout(() => setNotice(''), 2400);
    return () => clearTimeout(timeout);
  }, [notice]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All Orders') {
      return orders;
    }

    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter, orders]);

  const totalItems = useMemo(
    () => orders.reduce((sum, order) => sum + order.items.reduce((inner, item) => inner + item.quantity, 0), 0),
    [orders]
  );

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNotice(`Showing details for ${order.id}`);
  };

  const handleCancelOrder = (order) => {
    setOrders((currentOrders) =>
      currentOrders.map((entry) =>
        entry.id === order.id
          ? {
              ...entry,
              status: 'Cancelled',
              canCancel: false,
              deliveryEstimate: 'Cancellation requested successfully',
            }
          : entry
      )
    );
    setSelectedOrder((current) =>
      current?.id === order.id
        ? {
            ...current,
            status: 'Cancelled',
            canCancel: false,
            deliveryEstimate: 'Cancellation requested successfully',
          }
        : current
    );
    setActiveFilter('All Orders');
    setNotice(`Order ${order.id} was marked as cancelled.`);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (!isAuthenticated && !user) {
    return null;
  }

  return (
    <Page>
      <OrdersContainer>
        <Hero>
          <HeroTitle>
            <h1>Your Orders</h1>
            <p>Track packages, review purchases, and manage cancellations just like Amazon.</p>
          </HeroTitle>
          <QuickStat>
            <strong>{orders.length}</strong>
            <span>{totalItems} items across your recent orders</span>
          </QuickStat>
        </Hero>

        {notice ? <InlineNotice>{notice}</InlineNotice> : null}

        {selectedOrder ? (
          <DetailPanel>
            <h2>Order details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Placed on:</strong> {new Date(selectedOrder.placedAt).toLocaleString('en-IN')}</p>
            <p><strong>Summary:</strong> {selectedOrder.items.map((item) => item.name).join(', ')}</p>
          </DetailPanel>
        ) : null}

        <Filters>
          {orderFilters.map((filter) => (
            <FilterButton
              key={filter}
              type="button"
              $active={filter === activeFilter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </Filters>

        {loading ? (
          <LoadingShell>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </LoadingShell>
        ) : filteredOrders.length === 0 ? (
          <EmptyState>
            <h2>No orders in this filter</h2>
            <p>Try another tab or place a fresh order to see it appear here.</p>
            <PrimaryButton type="button" onClick={handleContinueShopping}>
              Continue shopping
            </PrimaryButton>
          </EmptyState>
        ) : (
          <OrdersList>
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onCancelOrder={handleCancelOrder}
              />
            ))}
          </OrdersList>
        )}
      </OrdersContainer>
    </Page>
  );
};

export default Orders;
