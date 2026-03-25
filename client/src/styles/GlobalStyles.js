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

  /* Hero Background Animations - Subtle & Professional */
  @keyframes subtleGradientShift {
    0%, 100% { 
      background-position: 0% 50%;
      opacity: 0.03;
    }
    50% { 
      background-position: 100% 50%;
      opacity: 0.02;
    }
  }

  @keyframes subtlePulse {
    0%, 100% { 
      opacity: 0.04;
    }
    50% { 
      opacity: 0.02;
    }
  }

  @keyframes subtleFloat {
    0%, 100% { 
      transform: translateY(0px) translateX(0px);
      opacity: 0.7;
    }
    25% { 
      transform: translateY(-8px) translateX(5px);
      opacity: 0.6;
    }
    50% { 
      transform: translateY(3px) translateX(-3px);
      opacity: 0.8;
    }
    75% { 
      transform: translateY(-5px) translateX(3px);
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
