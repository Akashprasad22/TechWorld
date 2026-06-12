import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SignIn, useUser } from '@clerk/react';
import { clerkSharedAppearance } from '../config/clerkAuth';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.68);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 2200;
`;

const ModalCard = styled.div`
  position: relative;
  width: min(100%, 980px);
  min-height: min(82vh, 720px);
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(320px, 1fr);
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(255, 179, 71, 0.35), transparent 45%),
    linear-gradient(135deg, #ffffff 0%, #fff8ef 100%);
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.28);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const BrandPanel = styled.div`
  background:
    linear-gradient(180deg, rgba(19, 25, 33, 0.94) 0%, rgba(35, 47, 62, 0.98) 100%);
  color: white;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 900px) {
    padding: 2rem;
    gap: 1.5rem;
  }
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #febd69;
`;

const BrandTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  margin: 1rem 0 0.9rem;
`;

const BrandCopy = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
  font-size: 1rem;
`;

const BenefitList = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.92);

  span {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(254, 189, 105, 0.18);
    color: #febd69;
    font-weight: 700;
  }
`;

const FormPanel = styled.div`
  position: relative;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 1.5rem 1rem 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  cursor: pointer;
  font-size: 1.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  }
`;

const ClerkShell = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthModal = ({ isOpen, onClose, redirectTo = '/' }) => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && isSignedIn) {
      onClose();
    }
  }, [isOpen, isSignedIn, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose} role="presentation">
      <ModalCard onClick={(event) => event.stopPropagation()}>
        <BrandPanel>
          <div>
            <BrandBadge>
              <span>TechHub</span>
            </BrandBadge>
            <BrandTitle>Sign in and pick up right where you left off.</BrandTitle>
            <BrandCopy>
              Access your cart, orders, wish lists, and faster checkout without leaving the page.
            </BrandCopy>
          </div>

          <BenefitList>
            <Benefit>
              <span>1</span>
              Secure email and social login with Clerk
            </Benefit>
            <Benefit>
              <span>2</span>
              Google, Apple, and other providers when enabled
            </Benefit>
            <Benefit>
              <span>3</span>
              Return to shopping instantly after sign-in
            </Benefit>
          </BenefitList>
        </BrandPanel>

        <FormPanel>
          <CloseButton type="button" onClick={onClose} aria-label="Close sign in modal">
            ×
          </CloseButton>
          <ClerkShell>
            <SignIn
              routing="virtual"
              signUpUrl="/signup"
              fallbackRedirectUrl={redirectTo}
              appearance={clerkSharedAppearance}
            />
          </ClerkShell>
        </FormPanel>
      </ModalCard>
    </Overlay>
  );
};

export default AuthModal;
