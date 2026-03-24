import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const ProductCardContainer = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f8f9fa;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.span`
  color: #ffd700;
`;

const RatingCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1rem;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (halfStar) {
      stars += '☆';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`}>
      <ProductCardContainer>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>₹{product.price}</ProductPrice>
          <ProductRating>
            <Stars>{generateStars(product.rating)}</Stars>
            <RatingCount>({product.reviews})</RatingCount>
          </ProductRating>
          <AddToCartButton onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductCardContainer>
    </Link>
  );
};

export default ProductCard;
