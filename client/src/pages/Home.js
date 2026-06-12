import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Container = styled.div`
  min-height: 100vh;
  background: #f3f3f3;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const AuthContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

const AuthButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroButton = styled(Link)`
  background: #ff9900;
  color: #111;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f3a847;
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #111;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CategoriesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: #111;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: #565959;
  font-size: 0.9rem;
`;

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products/featured?limit=8');
      if (response.data.success) {
        setFeaturedProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      icon: '💻',
      name: 'Computers',
      description: 'Laptops, Desktops & More',
      link: '/category/computers'
    },
    {
      icon: '📱',
      name: 'Phones',
      description: 'Smartphones & Accessories',
      link: '/category/phones'
    },
    {
      icon: '🎧',
      name: 'Audio',
      description: 'Headphones, Speakers & More',
      link: '/category/audio'
    },
    {
      icon: '🎮',
      name: 'Gaming',
      description: 'Consoles, Games & Accessories',
      link: '/category/gaming'
    },
    {
      icon: '🏠',
      name: 'Smart Home',
      description: 'IoT Devices & Automation',
      link: '/category/smart-home'
    },
    {
      icon: '⌚',
      name: 'Accessories',
      description: 'Watches, Cases & More',
      link: '/category/accessories'
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Show when="signed-out">
          <AuthContainer>
            <SignInButton mode="modal">
              <AuthButton>Sign In</AuthButton>
            </SignInButton>
            <SignUpButton mode="modal">
              <AuthButton>Sign Up</AuthButton>
            </SignUpButton>
          </AuthContainer>
        </Show>
        
        <Show when="signed-in">
          <UserContainer>
            <span>Welcome back!</span>
            <UserButton />
          </UserContainer>
        </Show>
        
        <HeroTitle>Welcome to TechHub</HeroTitle>
        <HeroSubtitle>Your one-stop destination for the latest electronics and gadgets</HeroSubtitle>
        <HeroButton to="/products">Shop Now</HeroButton>
      </HeroSection>

      <MainContent>
        <Section>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesSection>
            {categories.map((category, index) => (
              <CategoryCard key={index} to={category.link}>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryCard>
            ))}
          </CategoriesSection>
        </Section>

        <Section>
          <SectionTitle>Featured Products</SectionTitle>
          {loading && <p>Loading featured products...</p>}
          <ProductsGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductsGrid>
        </Section>
      </MainContent>
    </Container>
  );
};

export default Home;
