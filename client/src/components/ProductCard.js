import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { generateProductImage } from '../services/aiImageGenerator';

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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewDetailsButton = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 0.8rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: #5a67d8;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff5252;
  }
`;

const ImageGeneratingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const GeneratingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GeneratingText = styled.div`
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ImageReplacedBadge = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
`;

const ProductMedia = styled.div`
  position: relative;
`;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);

  for (let index = 0; index < fullStars; index += 1) {
    stars.push('★');
  }

  return stars.join('');
};

const formatPrice = (price) => {
  if (typeof price !== 'number') {
    return price;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiGeneratedImage, setAiGeneratedImage] = useState(null);

  const generateAIImage = async () => {
    setIsGeneratingImage(true);
    try {
      const aiImageUrl = await generateProductImage(
        product.name,
        product.description,
        product.category
      );
      setAiGeneratedImage(aiImageUrl);
      setImageError(false);
    } catch (error) {
      console.error('Image generation failed:', error);
      setImageError(true);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleImageError = async () => {
    if (!aiGeneratedImage && !isGeneratingImage) {
      await generateAIImage();
    } else {
      setImageError(true);
    }
  };

  const getCurrentImageSrc = () => {
    if (aiGeneratedImage) {
      return aiGeneratedImage;
    }

    if (imageError) {
      return 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }

    return product.image;
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: getCurrentImageSrc(),
      quantity: 1,
      userId: user?.id,
    });
  };

  const categoryLabel = product.brand
    ? `${product.category} • ${product.brand}`
    : product.gender
      ? `${product.category} • ${product.gender}`
      : product.category;

  return (
    <ProductCardContainer>
      <ProductMedia>
        <ProductImage
          src={getCurrentImageSrc()}
          alt={product.name}
          onError={handleImageError}
        />
        {isGeneratingImage && (
          <ImageGeneratingOverlay>
            <GeneratingSpinner />
            <GeneratingText>Generating AI Image...</GeneratingText>
          </ImageGeneratingOverlay>
        )}
      </ProductMedia>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductCategory>{categoryLabel}</ProductCategory>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>{product.priceLabel || formatPrice(product.price)}</ProductPrice>
        {product.rating && (
          <ProductRating>
            {renderStars(product.rating)} ({product.reviews} reviews)
          </ProductRating>
        )}
        {aiGeneratedImage && (
          <ImageReplacedBadge>Image Replaced</ImageReplacedBadge>
        )}
        <ProductActions>
          <ViewDetailsButton to={`/product/${product.id}`}>
            View Details
          </ViewDetailsButton>
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ProductActions>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;
