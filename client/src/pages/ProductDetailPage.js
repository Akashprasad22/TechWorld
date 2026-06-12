import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import { formatPrice, getProductById } from '../data/products';

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
`;

const ProductInfoContainer = styled.div`
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .meta {
    text-transform: uppercase;
    color: #777;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .stars {
      color: #ffd700;
      font-size: 1.2rem;
    }

    .rating-count {
      color: #666;
    }
  }

  .price {
    font-size: 2rem;
    font-weight: bold;
    color: #ff6b6b;
    margin-bottom: 1rem;
  }

  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .features {
    margin-bottom: 2rem;

    h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;

        &:before {
          content: "✓";
          color: #28a745;
          font-weight: bold;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;

    button {
      background: #f8f9fa;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;

      &:hover {
        background: #e9ecef;
      }
    }

    span {
      padding: 0.5rem 1rem;
      min-width: 50px;
      text-align: center;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s;

    &.add-to-cart {
      background: #667eea;
      color: white;
      flex: 1;
    }

    &.buy-now {
      background: #ff6b6b;
      color: white;
      flex: 1;
    }

    &.back {
      background: #6c757d;
      color: white;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  const metaLabel = useMemo(
    () => [product?.category, product?.brand, product?.gender].filter(Boolean).join(' • '),
    [product]
  );

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const generateStars = (rating) => '★'.repeat(Math.floor(rating || 0));

  if (!product) {
    return (
      <div className="container">
        <LoadingMessage>Product not found.</LoadingMessage>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <ProductContainer>
          <ProductImageContainer>
            <img src={product.image} alt={product.name} />
          </ProductImageContainer>
          <ProductInfoContainer>
            <h1>{product.name}</h1>
            <div className="meta">{metaLabel}</div>
            <div className="rating">
              <span className="stars">{generateStars(product.rating)}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>
            <div className="price">{product.priceLabel || formatPrice(product.price)}</div>
            <div className="description">{product.description}</div>

            {product.features && (
              <div className="features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <QuantitySelector>
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls" id="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </QuantitySelector>

            <ActionButtons>
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="back" onClick={() => navigate(-1)}>
                Back
              </button>
            </ActionButtons>
          </ProductInfoContainer>
        </ProductContainer>
      </div>
      <Cart />
    </>
  );
};

export default ProductDetailPage;
