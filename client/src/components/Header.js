import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 1200px;
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 1000;
  border: 1px solid rgba(255,255,255,0.1);
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }
  
  i {
    color: #f8fafc;
  }
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  input {
    flex: 1;
    padding: 0.8rem 1.5rem;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #333;
    background: transparent;
    
    &::placeholder {
      color: #999;
    }
    
    &:focus {
      background: #f8f9ff;
    }
  }
  
  button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover {
      background: #ff5252;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  min-width: 280px;
  z-index: 1002;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #667eea 100%);
    height: 4px;
    border-radius: 12px 12px 0 0;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f;
  color: #000;
  border-radius: 0;
  
  &:hover {
    background: #f8f9fa;
    color: #000;
    border-radius: 6px;
  }
  
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 6px 6px;
  }
`;

const DropdownIcon = styled.i`
  color: #666;
  font-size: 16px;
  width: 20px;
  text-align: center;
  margin-right: 12px;
`;

const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Navigation = styled.nav`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 0.5rem 1rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  padding: 1rem 1.5rem;
  display: block;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
  font-weight: 600;
  
  &:hover, &.active {
    background: rgba(255,255,255,0.2);
    border-bottom-color: #ffd700;
    color: #000;
  }
`;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { getTotalItems, toggleCart } = useCart();
  const { user, userData, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
    } else {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const closeProfileDropdown = () => {
    setIsProfileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const cartItemCount = getTotalItems();

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderTop>
          <Logo to="/">
            <h1><i className="fas fa-bolt"></i> TechHub</h1>
          </Logo>
          <SearchBar onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </SearchBar>
          <HeaderActions>
            <CartIcon onClick={toggleCart}>
              <i className="fas fa-shopping-cart"></i>
              {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
            </CartIcon>
            <UserMenu onClick={toggleProfileDropdown} ref={dropdownRef}>
              <i className="fas fa-user"></i>
              {isProfileOpen && (
                <ProfileDropdown className="profile-dropdown" isOpen={isProfileOpen} ref={dropdownRef}>
                  <DropdownItem onClick={() => { navigate('/profile'); closeProfileDropdown(); }}>
                    <DropdownIcon className="fas fa-user"></DropdownIcon>
                    <span>Profile</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => { navigate('/orders'); closeProfileDropdown(); }}>
                    <DropdownIcon className="fas fa-shopping-bag"></DropdownIcon>
                    <span>Orders</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => { navigate('/settings'); closeProfileDropdown(); }}>
                    <DropdownIcon className="fas fa-cog"></DropdownIcon>
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem onClick={async () => { 
                    try {
                      await logout();
                      closeProfileDropdown(); 
                    } catch (error) {
                      console.error('Logout error:', error);
                    }
                  }}>
                    <DropdownIcon className="fas fa-sign-out-alt"></DropdownIcon>
                    <span>Logout</span>
                  </DropdownItem>
                </ProfileDropdown>
              )}
            </UserMenu>
          </HeaderActions>
        </HeaderTop>
        <Navigation>
          <NavList>
            <li>
              <NavLink to="/" end>All Products</NavLink>
            </li>
            <li>
              <NavLink to="/category/phones">Phones</NavLink>
            </li>
            <li>
              <NavLink to="/category/laptops">Laptops</NavLink>
            </li>
            <li>
              <NavLink to="/category/tvs">TVs</NavLink>
            </li>
            <li>
              <NavLink to="/category/appliances">Appliances</NavLink>
            </li>
            <li>
              <NavLink to="/category/deals">Deals</NavLink>
            </li>
          </NavList>
        </Navigation>
      </div>
    </HeaderContainer>
  );
};

export default Header;
