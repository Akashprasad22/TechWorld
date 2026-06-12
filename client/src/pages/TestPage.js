import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const StatusCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
`;

const StatusTitle = styled.h3`
  color: #495057;
  margin-bottom: 1rem;
`;

const StatusText = styled.p`
  color: #6c757d;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
  
  &:hover {
    background: #0056b3;
  }
`;

const TestPage = () => {
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      alert('Backend Status: ' + JSON.stringify(data, null, 2));
    } catch (error) {
      alert('Backend Error: ' + error.message);
    }
  };

  const testFrontend = () => {
    alert('Frontend is working! React app is running successfully.');
  };

  return (
    <Container>
      <Title>🚀 MERN E-commerce Platform</Title>
      <Subtitle>Clean Local Development Setup</Subtitle>
      
      <StatusCard>
        <StatusTitle>✅ Frontend Status</StatusTitle>
        <StatusText>React app is running on port 3000</StatusText>
        <StatusText>Using react-scripts (no CRACO)</StatusText>
        <StatusText>Styled Components working</StatusText>
        <Button onClick={testFrontend}>Test Frontend</Button>
      </StatusCard>
      
      <StatusCard>
        <StatusTitle>🔧 Backend Status</StatusTitle>
        <StatusText>Express server running on port 5000</StatusText>
        <StatusText>MongoDB connection configured</StatusText>
        <StatusText>CORS enabled for local development</StatusText>
        <Button onClick={testBackend}>Test Backend</Button>
      </StatusCard>
      
      <StatusCard>
        <StatusTitle>📋 Configuration Summary</StatusTitle>
        <StatusText>✅ No CRACO - Using react-scripts</StatusText>
        <StatusText>✅ Clean dependencies - No bloat</StatusText>
        <StatusText>✅ Proxy configured - http://localhost:5000</StatusText>
        <StatusText>✅ Environment variables set</StatusText>
        <StatusText>✅ MongoDB: mongodb://127.0.0.1:27017/techhub</StatusText>
      </StatusCard>
      
      <StatusCard>
        <StatusTitle>🎯 Available Commands</StatusTitle>
        <StatusText>npm run dev - Start both servers</StatusText>
        <StatusText>npm run server - Start only backend</StatusText>
        <StatusText>npm run client - Start only frontend</StatusText>
        <StatusText>npm run install-all - Install all dependencies</StatusText>
      </StatusCard>
    </Container>
  );
};

export default TestPage;
