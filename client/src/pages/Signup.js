import React from 'react';
import styled from 'styled-components';
import { Navigate, useLocation } from 'react-router-dom';
import { SignUp } from '@clerk/react';
import { useAuth } from '../context/AuthContext';
import { clerkSharedAppearance } from '../config/clerkAuth';

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const SignupTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #1a1a2e;
  font-size: 2rem;
`;

const Signup = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const redirectTo = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <SignupContainer>
      <SignupTitle>Create Account</SignupTitle>
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        fallbackRedirectUrl={redirectTo}
        appearance={clerkSharedAppearance}
      />
    </SignupContainer>
  );
};

export default Signup;
