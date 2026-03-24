import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    animation: fadeInUp 0.8s ease;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 0.8s ease 0.2s both;
  }
`;

const CTAButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  animation: fadeInUp 0.8s ease 0.4s both;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255,107,107,0.3);
  }
`;

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <div className="container">
        <HeroContent>
          <h2>Latest Electronics at Best Prices</h2>
          <p>Discover amazing deals on phones, laptops, TVs and more</p>
          <CTAButton onClick={scrollToProducts}>
            Shop Now
          </CTAButton>
        </HeroContent>
      </div>
    </HeroSection>
  );
};

export default Hero;
