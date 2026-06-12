import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { formatPrice, getProductById } from '../data/products';
import { generateProductImage } from '../services/aiImageGenerator';

const ProductDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
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

const ProductMeta = styled.div`
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
    padding: 0.5rem 0 0.5rem 1.5rem;
    color: #666;
    position: relative;

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
  width: 50px;
  height: 50px;
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
  font-size: 1rem;
`;

const ImageReplacedBadge = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

const renderStars = (rating) => '★'.repeat(Math.floor(rating));

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiGeneratedImage, setAiGeneratedImage] = useState(null);

  const product = getProductById(id);

  const generateAIImage = async () => {
    if (!product) {
      return;
    }

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

  if (!product) {
    return (
      <ErrorMessage>
        <h2>Product Not Found</h2>
        <p>The product you&apos;re looking for doesn&apos;t exist.</p>
        <BackButton to="/products">Back to Products</BackButton>
      </ErrorMessage>
    );
  }

  const getCurrentImageSrc = () => {
    if (aiGeneratedImage) {
      return aiGeneratedImage;
    }

    if (imageError) {
      return 'https://images.unsplash.com/photo-1607082318824-0b96e631c11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }

    return product.image;
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: getCurrentImageSrc(),
      quantity: 1,
    });
  };

  const metaParts = [product.category, product.brand, product.gender].filter(Boolean);

  return (
    <ProductDetailsContainer>
      <ProductImageContainer>
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
      </ProductImageContainer>

      <ProductInfoContainer>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductMeta>{metaParts.join(' • ')}</ProductMeta>
        <ProductPrice>{product.priceLabel || formatPrice(product.price)}</ProductPrice>

        {product.rating && (
          <ProductRating>
            {renderStars(product.rating)} ({product.reviews} reviews)
          </ProductRating>
        )}

        {aiGeneratedImage && (
          <ImageReplacedBadge>Image Replaced</ImageReplacedBadge>
        )}

        <ProductDescription>{product.description}</ProductDescription>

        {product.features && (
          <ProductFeatures>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
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
