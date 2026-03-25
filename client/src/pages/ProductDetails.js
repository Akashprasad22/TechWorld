import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';

const ProductDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
`;

const ProductImageContainer = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ProductInfoContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #666;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ProductFeatures = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem 0;
    color: #666;
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #ff5252;
  }
`;

const BackButton = styled(Link)`
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);

  if (!product) {
    return (
      <ErrorMessage>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <BackButton to="/products">Back to Products</BackButton>
      </ErrorMessage>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <ProductDetailsContainer>
      <ProductImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ProductImageContainer>
      
      <ProductInfoContainer>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductCategory>{product.category}</ProductCategory>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        
        {product.rating && (
          <ProductRating>
            {renderStars(product.rating)} ({product.reviews} reviews)
          </ProductRating>
        )}
        
        <ProductDescription>{product.description}</ProductDescription>
        
        {product.features && (
          <ProductFeatures>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </ProductFeatures>
        )}
        
        <ProductActions>
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
          <BackButton to="/products">Back to Products</BackButton>
        </ProductActions>
        
        <div>
          <strong>Stock Status:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </ProductInfoContainer>
    </ProductDetailsContainer>
  );
};

export default ProductDetails;
