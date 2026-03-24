import React, { useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: #ffd700;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #ffd700;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    
    &:hover {
      background: #ffd700;
      color: #2c3e50;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
  }
  
  button {
    background: #ffd700;
    color: #2c3e50;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover {
      background: #ffed4e;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: #95a5a6;
`;

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    alert('Successfully subscribed to newsletter!');
    setEmail('');
  };

  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>About TechHub</h3>
            <p>Your trusted destination for the latest electronics and gadgets.</p>
            <SocialLinks>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </SocialLinks>
          </FooterSection>
          <FooterSection>
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Newsletter</h3>
            <p>Subscribe for exclusive deals and new product updates.</p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </NewsletterForm>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <p>&copy; 2024 TechHub. All rights reserved.</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
