# TechHub - MERN Stack E-Commerce Website

A modern, responsive e-commerce website for electronics built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **Product Catalog**: Browse electronics (phones, laptops, TVs, appliances)
- **Shopping Cart**: Add/remove items, quantity management
- **Search & Filter**: Search products, filter by category, brand, price, rating
- **Sorting**: Sort by price, rating, featured
- **Product Details**: Detailed product pages with specifications
- **User Authentication**: Register, login, profile management
- **Order Management**: Place orders, track order status
- **Responsive Design**: Mobile-first responsive design
- **Modern UI**: Beautiful gradient design with smooth animations

## 🛠️ Technology Stack

### Frontend (React.js)
- React 18
- React Router for navigation
- Styled Components for styling
- Context API for state management
- Axios for API calls

### Backend (Node.js/Express.js)
- Express.js server
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security
- Express rate limiting

### Database (MongoDB)
- Product schema with categories
- User schema with authentication
- Order schema with order tracking

## 📁 Project Structure

```
amazon/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles
│   │   └── App.js          # Main App component
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Express server
│   ├── seed.js             # Database seed
│   └── .env                # Environment variables
├── package.json            # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazon
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/techhub
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Setup MongoDB**
   
   - For local MongoDB: Make sure MongoDB is running on `mongodb://localhost:27017`
   - For MongoDB Atlas: Replace `MONGODB_URI` with your Atlas connection string

5. **Seed the database**
   ```bash
   cd server
   node seed.js
   cd ..
   ```

6. **Run the application**
   
   **Development mode (both frontend and backend):**
   ```bash
   npm run dev
   ```
   
   **Or run separately:**
   ```bash
   # Backend server
   npm run server
   
   # Frontend (in another terminal)
   npm run client
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:3000` for the frontend
   Backend API runs on `http://localhost:5000`

## 📱 Available Scripts

### Root Scripts
- `npm start` - Start the production server
- `npm run dev` - Run both frontend and backend in development
- `npm run server` - Start backend server with nodemon
- `npm run client` - Start React development server
- `npm run build` - Build React app for production

### Client Scripts
- `npm start` - Start React development server
- `npm build` - Build React app for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Server Scripts
- `node server.js` - Start production server
- `node seed.js` - Seed database with sample products

## 🛣️ API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured/deals` - Get featured products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile/:userId` - Update user profile
- `POST /api/users/:userId/addresses` - Add address
- `PUT /api/users/:userId/addresses/:addressId` - Update address

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin)

## 🎨 Features Overview

### Product Management
- Product categories: Phones, Laptops, TVs, Appliances
- Advanced filtering by brand, price range, rating
- Search functionality with full-text search
- Sorting options (price, rating, featured)
- Product detail pages with specifications

### Shopping Cart
- Add/remove items from cart
- Quantity management
- Real-time cart updates
- Slide-out cart modal
- Cart persistence in context

### User Features
- User registration and login
- JWT authentication
- Profile management
- Address management
- Order history

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized for all screen sizes

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `NODE_ENV` - Environment (development/production)

### MongoDB Collections
- `products` - Product information
- `users` - User accounts and profiles
- `orders` - Order information and tracking

## 🚀 Deployment

### Heroku Deployment
1. Set up MongoDB Atlas
2. Update environment variables
3. Deploy with Heroku CLI:
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   git push heroku main
   ```

### Production Build
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React.js documentation
- Express.js documentation
- MongoDB documentation
- Font Awesome for icons
- Styled Components for CSS-in-JS

## 📞 Support

For support, please email support@techhub.com or create an issue on GitHub.
