import React from 'react';
import styled from 'styled-components';

const Card = styled.article`
  background: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
`;

const Header = styled.div`
  padding: 1rem 1.25rem;
  background: linear-gradient(180deg, #f8fafc 0%, #eef3f7 100%);
  border-bottom: 1px solid #e5e7eb;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderLabel = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
`;

const HeaderValue = styled.div`
  color: #111827;
  font-weight: 700;
  line-height: 1.4;
`;

const Body = styled.div`
  padding: 1.25rem;
  display: grid;
  gap: 1rem;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 104px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 760px) {
    grid-template-columns: 80px 1fr;
  }
`;

const ProductImage = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  border-radius: 14px;
  background: #f8fafc;

  @media (max-width: 760px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  min-width: 0;
`;

const ItemName = styled.h3`
  margin: 0 0 0.35rem;
  color: #111827;
  font-size: 1.05rem;
`;

const ItemMeta = styled.div`
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ItemActions = styled.div`
  display: grid;
  gap: 0.6rem;
  min-width: 168px;

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    min-width: 0;
    grid-template-columns: 1fr 1fr;
  }
`;

const ActionButton = styled.button`
  border: 1px solid ${props => (props.$danger ? '#f1b4b7' : '#d5d9d9')};
  background: ${props => (props.$primary ? '#ffd814' : props.$danger ? '#fff5f5' : 'white')};
  color: ${props => (props.$danger ? '#b91c1c' : '#111827')};
  border-radius: 999px;
  min-height: 40px;
  padding: 0.65rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

const Footer = styled.div`
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  background: ${props => props.$bg};
  color: ${props => props.$color};
`;

const StatusDot = styled.span`
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: currentColor;
`;

const FooterText = styled.div`
  color: #475569;
  font-size: 0.94rem;
`;

const statusMap = {
  Delivered: {
    bg: '#dcfce7',
    color: '#166534',
  },
  Pending: {
    bg: '#fef3c7',
    color: '#92400e',
  },
  Cancelled: {
    bg: '#fee2e2',
    color: '#b91c1c',
  },
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const OrderCard = ({ order, onViewDetails, onCancelOrder }) => {
  const statusTone = statusMap[order.status] || statusMap.Pending;

  return (
    <Card>
      <Header>
        <div>
          <HeaderLabel>Order placed</HeaderLabel>
          <HeaderValue>
            {new Date(order.placedAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </HeaderValue>
        </div>
        <div>
          <HeaderLabel>Total</HeaderLabel>
          <HeaderValue>{formatCurrency(order.total)}</HeaderValue>
        </div>
        <div>
          <HeaderLabel>Ship to</HeaderLabel>
          <HeaderValue>Akash Kumar</HeaderValue>
        </div>
        <div>
          <HeaderLabel>Order #</HeaderLabel>
          <HeaderValue>{order.id}</HeaderValue>
        </div>
      </Header>

      <Body>
        {order.items.map((item) => (
          <ItemRow key={item.id}>
            <ProductImage src={item.image} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemMeta>{formatCurrency(item.price)}</ItemMeta>
              <ItemMeta>Quantity: {item.quantity}</ItemMeta>
            </ItemDetails>
            <ItemActions>
              <ActionButton type="button" $primary onClick={() => onViewDetails(order)}>
                View details
              </ActionButton>
              {order.canCancel ? (
                <ActionButton type="button" $danger onClick={() => onCancelOrder(order)}>
                  Cancel order
                </ActionButton>
              ) : (
                <ActionButton type="button" onClick={() => onViewDetails(order)}>
                  Buy again
                </ActionButton>
              )}
            </ItemActions>
          </ItemRow>
        ))}
      </Body>

      <Footer>
        <StatusBadge $bg={statusTone.bg} $color={statusTone.color}>
          <StatusDot />
          {order.status}
        </StatusBadge>
        <FooterText>{order.deliveryEstimate}</FooterText>
      </Footer>
    </Card>
  );
};

export default OrderCard;
