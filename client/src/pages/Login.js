import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #1a1a2e;
  font-size: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #f8f9ff;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  color: #667eea;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: #764ba2;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        // Sign up
        console.log('Attempting signup with:', name, email);
        const result = await signup(name, email, password);
        
        if (result.success) {
          console.log('User signed up successfully:', result.user);
          setSuccess('Account created successfully! Redirecting to homepage...');
          setTimeout(() => navigate('/'), 2000);
        } else {
          throw new Error(result.error);
        }
      } else {
        // Sign in
        console.log('Attempting login with:', email);
        const result = await login(email, password);
        
        if (result.success) {
          console.log('User signed in successfully:', result.user);
          setSuccess('Login successful! Redirecting to homepage...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          throw new Error(result.error);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      let errorMessage = 'An error occurred. Please try again.';
      
      // Handle specific error messages
      if (error.message.includes('already exists')) {
        errorMessage = 'An account with this email already exists.';
      } else if (error.message.includes('password')) {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.message.includes('email')) {
        errorMessage = 'Please enter a valid email address.';
      } else {
        errorMessage = error.message || 'Failed to authenticate. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>{isSignUp ? 'Create Account' : 'Login'}</LoginTitle>
      
      <LoginForm onSubmit={handleSubmit}>
        {isSignUp && (
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </InputGroup>
        )}
        
        <InputGroup>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </InputGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? (isSignUp ? 'Creating Account...' : 'Logging in...') : (isSignUp ? 'Create Account' : 'Login')}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <ToggleButton
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
            setSuccess('');
          }}
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </ToggleButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
