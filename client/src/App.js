import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
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
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <Hero />
                      <ProductsPage />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              <Route path="/products" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <ProductsPage />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              <Route path="/product/:id" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <ProductDetailPage />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              <Route path="/cart" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <CartPage />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <Profile />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              <Route path="/category/:category" element={
                <PrivateRoute>
                  <>
                    <Header />
                    <MainContent>
                      <ProductsPage />
                    </MainContent>
                    <Footer />
                  </>
                </PrivateRoute>
              } />
              
              {/* Redirect any unknown routes to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AppContainer>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
