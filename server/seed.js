const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample product data
const sampleProducts = [
  {
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 99999,
    category: "phones",
    brand: "apple",
    image: "/assets/images/iphone.webp",
    rating: 4.8,
    reviews: 2453,
    stock: 50,
    features: [
      "A17 Pro chip with 6-core CPU",
      "Titanium design with Dynamic Island",
      "Pro camera system with 5x telephoto",
      "Action button for customization",
      "USB-C connectivity"
    ],
    specifications: {
      "Display": "6.7\" Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Battery": "All-day battery life",
      "Storage": "256GB, 512GB, 1TB options",
      "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
    }
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android phone with S Pen, 200MP camera, and AMOLED display",
    price: 107999,
    category: "phones",
    brand: "samsung",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Galaxy+S24+Ultra",
    rating: 4.7,
    reviews: 1876,
    stock: 45,
    features: [
      "200MP main camera with 5x optical zoom",
      "S Pen included for productivity",
      "Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 processor",
      "5000mAh battery with fast charging"
    ],
    specifications: {
      "Display": "6.8\" Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main, 50MP Periscope, 12MP Ultra Wide, 10MP Telephoto",
      "Battery": "5000mAh",
      "Storage": "256GB, 512GB, 1TB options",
      "Colors": "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow"
    }
  },
  {
    name: "MacBook Pro 16\"",
    description: "Powerful laptop with M3 Max chip, stunning retina display, and all-day battery",
    price: 199999,
    category: "laptops",
    brand: "apple",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=MacBook+Pro+16",
    rating: 4.9,
    reviews: 1234,
    stock: 30,
    features: [
      "M3 Max chip with incredible performance",
      "Stunning Liquid Retina XDR display",
      "Up to 22 hours battery life",
      "Advanced camera and studio-quality mics",
      "Magic Keyboard with Touch ID"
    ],
    specifications: {
      "Display": "16.2\" Liquid Retina XDR",
      "Processor": "M3 Max chip",
      "Memory": "Up to 128GB unified memory",
      "Storage": "Up to 8TB SSD",
      "Battery": "Up to 22 hours",
      "Ports": "3x Thunderbolt 4, HDMI, SD card slot"
    }
  },
  {
    name: "Dell XPS 15",
    description: "High-performance Windows laptop with 4K display and powerful graphics",
    price: 149999,
    category: "laptops",
    brand: "dell",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+XPS+15",
    rating: 4.6,
    reviews: 987,
    stock: 25,
    features: [
      "Stunning 4K OLED display",
      "Intel Core i9 processor",
      "NVIDIA RTX graphics",
      "Premium aluminum design",
      "Long battery life"
    ],
    specifications: {
      "Display": "15.6\" 4K OLED",
      "Processor": "Intel Core i9-13900H",
      "Graphics": "NVIDIA GeForce RTX 4070",
      "Memory": "Up to 64GB DDR5",
      "Storage": "Up to 2TB SSD",
      "Battery": "Up to 12 hours"
    }
  },
  {
    name: "Samsung 65\" QLED 4K TV",
    description: "Premium QLED TV with vibrant colors, smart features, and gaming mode",
    price: 99999,
    category: "tvs",
    brand: "samsung",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+QLED+TV",
    rating: 4.7,
    reviews: 1543,
    stock: 20,
    features: [
      "Quantum HDR 32x with vivid colors",
      "Object Tracking Sound",
      "Game Mode for gaming",
      "Smart TV with Tizen OS",
      "Multiple voice assistants"
    ],
    specifications: {
      "Display": "65\" QLED 4K UHD",
      "Resolution": "3840 x 2160",
      "HDR": "Quantum HDR 32x",
      "Smart TV": "Tizen OS",
      "Gaming": "Game Mode, Motion Xcelerator",
      "Audio": "Object Tracking Sound"
    }
  },
  {
    name: "LG 55\" OLED 4K TV",
    description: "Perfect black levels, infinite contrast, and Dolby Vision IQ",
    price: 119999,
    category: "tvs",
    brand: "lg",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+OLED+TV",
    rating: 4.8,
    reviews: 2109,
    stock: 18,
    features: [
      "Perfect black levels",
      "Dolby Vision IQ and Atmos",
      "webOS Smart TV",
      "Gaming Optimizer",
      "ThinQ AI with voice control"
    ],
    specifications: {
      "Display": "55\" OLED 4K UHD",
      "Resolution": "3840 x 2160",
      "HDR": "Dolby Vision IQ",
      "Smart TV": "webOS 23",
      "Gaming": "Gaming Optimizer, 120Hz refresh rate",
      "Audio": "Dolby Atmos"
    }
  },
  {
    name: "Samsung 28 cu.ft. Refrigerator",
    description: "Smart refrigerator with Family Hub, ice maker, and energy efficient design",
    price: 179999,
    category: "appliances",
    brand: "samsung",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+Refrigerator",
    rating: 4.5,
    reviews: 654,
    stock: 15,
    features: [
      "Family Hub with 21.5\" touchscreen",
      "FlexZone drawer with 4 temperature settings",
      "Ice and water dispenser",
      "Energy Star certified",
      "Wi-Fi connectivity"
    ],
    specifications: {
      "Capacity": "28 cu.ft.",
      "Dimensions": "35.75\" x 70\" x 36.75\"",
      "Features": "Family Hub, FlexZone, Ice Maker",
      "Energy": "Energy Star certified",
      "Connectivity": "Wi-Fi, SmartThings",
      "Warranty": "1 year parts and labor"
    }
  },
  {
    name: "LG 24 cu.ft. Smart Refrigerator",
    description: "Smart cooling technology, InstaView door, and Wi-Fi connectivity",
    price: 149999,
    category: "appliances",
    brand: "lg",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+Smart+Fridge",
    rating: 4.4,
    reviews: 432,
    stock: 12,
    features: [
      "InstaView door-in-door",
      "Smart cooling technology",
      "ThinQ app control",
      "Door-in-door design",
      "LED lighting"
    ],
    specifications: {
      "Capacity": "24 cu.ft.",
      "Dimensions": "36\" x 70\" x 36\"",
      "Features": "InstaView, Smart Cooling",
      "Technology": "ThinQ app, Wi-Fi",
      "Lighting": "LED interior lighting",
      "Warranty": "1 year limited warranty"
    }
  },
  {
    name: "HP Spectre x360 14",
    description: "2-in-1 convertible laptop with OLED display and long battery life",
    price: 129999,
    category: "laptops",
    brand: "hp",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=HP+Spectre+x360",
    rating: 4.5,
    reviews: 765,
    stock: 22,
    features: [
      "2-in-1 convertible design",
      "Stunning OLED display",
      "Intel Core i7 processor",
      "Long battery life",
      "Premium build quality"
    ],
    specifications: {
      "Display": "14\" OLED 1920x1280",
      "Processor": "Intel Core i7-1360P",
      "Memory": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Battery": "Up to 17 hours",
      "Weight": "3.01 lbs"
    }
  },
  {
    name: "iPad Pro 12.9\"",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display",
    price: 89999,
    category: "phones",
    brand: "apple",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=iPad+Pro+12.9",
    rating: 4.7,
    reviews: 1432,
    stock: 35,
    features: [
      "M2 chip with incredible performance",
      "Liquid Retina XDR display",
      "ProMotion technology",
      "Apple Pencil support",
      "5G connectivity"
    ],
    specifications: {
      "Display": "12.9\" Liquid Retina XDR",
      "Processor": "M2 chip",
      "Storage": "128GB, 256GB, 512GB, 1TB, 2TB",
      "Camera": "12MP Wide, 10MP Ultra Wide",
      "Battery": "Up to 10 hours",
      "Connectivity": "5G, Wi-Fi 6E"
    }
  },
  {
    name: "Sony 75\" BRAVIA XR 4K TV",
    description: "Cognitive processor XR, perfect for gaming and movies",
    price: 159999,
    category: "tvs",
    brand: "sony",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Sony+BRAVIA+XR",
    rating: 4.6,
    reviews: 876,
    stock: 10,
    features: [
      "Cognitive Processor XR",
      "XR Contrast Pro",
      "XR Triluminos Pro",
      "Perfect for gaming",
      "Acoustic Multi-Audio"
    ],
    specifications: {
      "Display": "75\" 4K UHD",
      "Processor": "Cognitive Processor XR",
      "HDR": "HDR10, Dolby Vision",
      "Gaming": "Perfect for PlayStation 5",
      "Audio": "Acoustic Multi-Audio",
      "Smart TV": "Google TV"
    }
  },
  {
    name: "Dell Inspiron 15",
    description: "Affordable laptop with good performance for everyday tasks",
    price: 59999,
    category: "laptops",
    brand: "dell",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+Inspiron+15",
    rating: 4.3,
    reviews: 543,
    stock: 40,
    features: [
      "Affordable price point",
      "Good performance",
      "Comfortable keyboard",
      "Long battery life",
      "Multiple ports"
    ],
    specifications: {
      "Display": "15.6\" FHD 1920x1080",
      "Processor": "Intel Core i5-1335U",
      "Memory": "8GB DDR4",
      "Storage": "512GB SSD",
      "Battery": "Up to 8 hours",
      "Weight": "3.93 lbs"
    }
  }
];

// Seed function
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} products`);

    mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
