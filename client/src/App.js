import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContainer>
            <GlobalStyles />
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <ProductsPage />
                  </>
                } />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/category/:category" element={<ProductsPage />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
