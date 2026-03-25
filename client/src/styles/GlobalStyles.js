import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Loading State */
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .loading::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }

  /* Toast Notification */
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  }

  .toast.success {
    background: #28a745;
  }

  .toast.error {
    background: #dc3545;
  }

  /* Animations */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Hero Background Animations */
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(90deg); }
    50% { transform: translateY(10px) rotate(180deg); }
    75% { transform: translateY(-15px) rotate(270deg); }
  }

  @keyframes float2 {
    0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
    25% { transform: translateX(15px) translateY(-25px) scale(1.1); }
    50% { transform: translateX(-10px) translateY(15px) scale(0.9); }
    75% { transform: translateX(20px) translateY(-10px) scale(1.05); }
  }

  @keyframes float3 {
    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    33% { transform: translateY(-30px) translateX(20px) rotate(120deg); }
    66% { transform: translateY(20px) translateX(-15px) rotate(240deg); }
  }

  @keyframes float4 {
    0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
    50% { transform: translateX(-25px) translateY(30px) scale(1.2); }
  }

  @keyframes float5 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(25px) rotate(-90deg) scale(0.8); }
    50% { transform: translateY(-15px) rotate(-180deg) scale(1.1); }
    75% { transform: translateY(20px) rotate(-270deg) scale(0.9); }
  }

  @keyframes float6 {
    0%, 100% { transform: translateX(0px) translateY(0px); }
    20% { transform: translateX(15px) translateY(-20px); }
    40% { transform: translateX(-10px) translateY(25px); }
    60% { transform: translateX(20px) translateY(-10px); }
    80% { transform: translateX(-15px) translateY(15px); }
  }

  @keyframes gradientShift {
    0%, 100% { 
      background-position: 0% 50%;
      opacity: 0.8;
    }
    25% { 
      background-position: 25% 25%;
      opacity: 0.6;
    }
    50% { 
      background-position: 100% 50%;
      opacity: 0.9;
    }
    75% { 
      background-position: 75% 75%;
      opacity: 0.7;
    }
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 0.3;
    }
    50% { 
      opacity: 0.6;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 10px;
    }
  }
`;

export default GlobalStyles;
