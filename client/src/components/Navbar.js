import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, UserButton, useUser } from '@clerk/react';
import { useCart } from '../context/CartContext';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(90deg, #131921 0%, #232f3e 100%);
  color: white;
  box-shadow: 0 10px 28px rgba(17, 24, 39, 0.18);
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 960px) {
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ff9900;
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    color: #ffb84d;
  }
`;

const SearchContainer = styled.form`
  flex: 1;
  display: flex;
  max-width: 860px;
  overflow: hidden;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: #febd69;
    box-shadow: 0 0 0 4px rgba(254, 189, 105, 0.18);
  }

  @media (max-width: 960px) {
    order: 3;
    width: 100%;
    max-width: none;
  }
`;

const SearchDropdown = styled.select`
  border: none;
  background: #e5e7eb;
  color: #111827;
  padding: 0 0.8rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.85rem 1rem;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  border: none;
  background: linear-gradient(180deg, #ffd277 0%, #f4b24d 100%);
  color: #111827;
  padding: 0 1.2rem;
  cursor: pointer;
`;

const RightNav = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.35rem;
  margin-left: auto;
`;

const NavItem = styled.div`
  position: relative;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 52px;
  padding: 0.45rem 0.9rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.38);
    background: rgba(255, 255, 255, 0.06);
    color: #febd69;
  }
`;

const NavText = styled.span`
  font-size: 0.8rem;
  line-height: 1.2;

  strong {
    display: block;
    font-size: 0.92rem;
    font-weight: 700;
  }
`;

const NavIcon = styled.span`
  font-size: 1.08rem;
`;

const AccountMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 310px;
  background: white;
  color: #111827;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  opacity: ${props => (props.$open ? 1 : 0)};
  transform: ${props => (props.$open ? 'translateY(0)' : 'translateY(-10px)')};
  pointer-events: ${props => (props.$open ? 'auto' : 'none')};
  transition: opacity 0.18s ease, transform 0.18s ease;
  overflow: hidden;
`;

const MenuHeader = styled.div`
  padding: 1rem;
  background: linear-gradient(180deg, #fff8ee 0%, #ffffff 100%);
  border-bottom: 1px solid #eef2f7;
`;

const MenuEyebrow = styled.div`
  color: #92400e;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
`;

const MenuTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const MenuSubtitle = styled.p`
  margin: 0.35rem 0 0;
  color: #6b7280;
  line-height: 1.5;
  font-size: 0.92rem;
`;

const MenuBody = styled.div`
  padding: 0.85rem;
  display: grid;
  gap: 0.55rem;
`;

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #111827;
  background: #f8fafc;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: #eef2f7;
    transform: translateY(-1px);
  }
`;

const ModalTriggerButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 0.95rem 1rem;
  background: #131921;
  color: white;
  font-weight: 700;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #232f3e;
  }
`;

const MenuFooter = styled.div`
  padding: 0.85rem 1rem 1rem;
  border-top: 1px solid #eef2f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
`;

const CartContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: white;
  text-decoration: none;
  position: relative;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 0.45rem 0.9rem;
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;

  &:hover {
    color: #febd69;
    border-color: rgba(255, 255, 255, 0.38);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 2px;
  right: 8px;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: #ff9900;
  color: #131921;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
`;

const BottomNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 2rem;
  background: rgba(0, 0, 0, 0.16);
  overflow-x: auto;

  @media (max-width: 960px) {
    padding: 0.55rem 1rem;
  }
`;

const Category = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  white-space: nowrap;
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #febd69;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) {
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleOrdersClick = () => {
    if (isSignedIn) {
      navigate('/orders');
    }
  };

  return (
    <NavbarContainer>
      <TopNav>
        <Logo to="/">TechHub</Logo>

        <SearchContainer onSubmit={handleSearch}>
          <SearchDropdown defaultValue="All" aria-label="Search category">
            <option>All</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Phones</option>
            <option>Accessories</option>
          </SearchDropdown>
          <SearchInput
            type="text"
            placeholder="Search TechHub"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <SearchButton type="submit" aria-label="Search">
            <i className="fas fa-search"></i>
          </SearchButton>
        </SearchContainer>

        <RightNav>
          <NavItem
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <NavButton type="button">
                  <NavIcon><i className="fas fa-user"></i></NavIcon>
                  <NavText>
                    Hello, Sign in
                    <strong>Account & Lists</strong>
                  </NavText>
                </NavButton>
              </SignInButton>
            ) : (
              <NavButton type="button">
                <NavIcon><i className="fas fa-user"></i></NavIcon>
                <NavText>
                  {`Hello, ${user?.firstName || user?.fullName || 'there'}`}
                  <strong>Account & Lists</strong>
                </NavText>
              </NavButton>
            )}

            <AccountMenu $open={isAccountMenuOpen}>
              {!isSignedIn ? (
                <>
                  <MenuHeader>
                    <MenuEyebrow>New Here?</MenuEyebrow>
                    <MenuTitle>Sign in for your best shopping experience</MenuTitle>
                    <MenuSubtitle>
                      Access orders, saved cart items, and checkout faster without leaving this page.
                    </MenuSubtitle>
                  </MenuHeader>
                  <MenuBody>
                    <SignInButton mode="modal">
                      <ModalTriggerButton type="button">Sign in securely</ModalTriggerButton>
                    </SignInButton>
                    <MenuLink to="/signup">Create your account</MenuLink>
                  </MenuBody>
                </>
              ) : (
                <>
                  <MenuHeader>
                    <MenuEyebrow>Signed In</MenuEyebrow>
                    <MenuTitle>{user?.fullName || user?.primaryEmailAddress?.emailAddress}</MenuTitle>
                    <MenuSubtitle>
                      Jump into your profile, orders, and account settings like Amazon.
                    </MenuSubtitle>
                  </MenuHeader>
                  <MenuBody>
                    <MenuLink to="/profile">Your Profile</MenuLink>
                    <MenuLink to="/orders">Your Orders</MenuLink>
                    <MenuLink to="/cart">Your Cart</MenuLink>
                  </MenuBody>
                  <MenuFooter>
                    <span>Manage account</span>
                    <UserButton afterSignOutUrl="/" />
                  </MenuFooter>
                </>
              )}
            </AccountMenu>
          </NavItem>

          <NavItem>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <NavButton type="button">
                  <NavIcon><i className="fas fa-box-open"></i></NavIcon>
                  <NavText>
                    Returns
                    <strong>& Orders</strong>
                  </NavText>
                </NavButton>
              </SignInButton>
            ) : (
              <NavButton type="button" onClick={handleOrdersClick}>
                <NavIcon><i className="fas fa-box-open"></i></NavIcon>
                <NavText>
                  Returns
                  <strong>& Orders</strong>
                </NavText>
              </NavButton>
            )}
          </NavItem>

          <CartContainer to="/cart">
            <NavIcon><i className="fas fa-shopping-cart"></i></NavIcon>
            <NavText>
              Cart
              <strong>{cartItemCount}</strong>
            </NavText>
            {cartItemCount > 0 ? <CartCount>{cartItemCount}</CartCount> : null}
          </CartContainer>
        </RightNav>
      </TopNav>

      <BottomNav>
        <Category to="/">Today's Deals</Category>
        <Category to="/products">Customer Service</Category>
        <Category to="/products">Registry</Category>
        <Category to="/products">Gift Cards</Category>
        <Category to="/products">Sell</Category>
      </BottomNav>
    </NavbarContainer>
  );
};

export default Navbar;
