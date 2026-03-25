import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(29, 78, 216, 0.03) 0%,
      rgba(15, 23, 42, 0.02) 50%,
      rgba(29, 78, 216, 0.03) 100%);
    animation: subtleGradientShift 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 70%),
      radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
    animation: subtlePulse 12s ease-in-out infinite;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: subtleFloat ${props => props.duration || 15}s ease-in-out infinite;
  opacity: 0.7;
`;

const HeroContent = styled.div`
  background: rgba(15, 23, 42, 0.92);
  border-radius: 32px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  position: relative;
  z-index: 10;
  
  h2 {
    font-size: clamp(2rem, 4vw, 3.3rem);
    margin-bottom: 0.8rem;
    animation: fadeInUp 0.8s ease;
  }
  
  p {
    font-size: 1.08rem;
    max-width: 700px;
    margin: 0 auto 1.8rem;
    color: rgba(255, 255, 255, 0.82);
    animation: fadeInUp 0.8s ease 0.15s both;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, var(--accent), #fb923c);
  color: white;
  border: none;
  padding: 0.95rem 2rem;
  font-size: 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: fadeInUp 0.8s ease 0.3s both;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(249, 115, 22, 0.3);
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
      <AnimatedBackground>
        <FloatingElement 
          duration={20}
          style={{
            width: '80px',
            height: '80px',
            top: '15%',
            left: '8%',
          }}
        />
        <FloatingElement 
          duration={25}
          style={{
            width: '60px',
            height: '60px',
            top: '25%',
            right: '12%',
          }}
        />
        <FloatingElement 
          duration={30}
          style={{
            width: '100px',
            height: '100px',
            bottom: '20%',
            left: '15%',
          }}
        />
      </AnimatedBackground>
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
