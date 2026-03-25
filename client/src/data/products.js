// Product Data Structure
// Complete e-commerce product database with dummy data

export const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420958-88e529a7b6b?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Premium wireless Bluetooth headphones with active noise cancellation and 30-hour battery life. Experience crystal-clear audio quality with deep bass and comfortable over-ear design.",
    category: "Electronics",
    features: ["Bluetooth 5.0", "Noise Cancellation", "30hr Battery", "Premium Sound"],
    rating: 4.5,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335883-b626f84dcf7?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Advanced smartwatch with health tracking, GPS, and smartphone integration. Features a vibrant AMOLED display and 7-day battery life. Water-resistant design perfect for active lifestyles.",
    category: "Electronics",
    features: ["AMOLED Display", "Health Tracking", "GPS", "Water Resistant"],
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 3,
    name: "Professional Camera Kit",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1542030185086-824a1aa3c5b?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Complete professional photography kit including DSLR camera, multiple lenses, tripod, and carrying case. Perfect for both beginners and experienced photographers.",
    category: "Electronics",
    features: ["24MP Sensor", "4K Video", "Multiple Lenses", "Professional Kit"],
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1586023498325-558dc9a1c77?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort during long work sessions.",
    category: "Furniture",
    features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh", "360° Swivel"],
    rating: 4.6,
    reviews: 312,
    inStock: true
  },
  {
    id: 5,
    name: "Standing Desk Converter",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Electric standing desk converter with memory presets and smooth height adjustment. Transform your workspace from sitting to standing in seconds.",
    category: "Furniture",
    features: ["Electric Motor", "Memory Presets", "Smooth Adjustment", "Cable Management"],
    rating: 4.4,
    reviews: 98,
    inStock: true
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1615463149636-5ae231b8044?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "High-precision wireless gaming mouse with customizable RGB lighting and 16,000 DPI sensor. Ergonomic design reduces wrist strain during extended gaming sessions.",
    category: "Electronics",
    features: ["RGB Lighting", "16,000 DPI", "Ergonomic Design", "Wireless"],
    rating: 4.7,
    reviews: 445,
    inStock: true
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Premium mechanical keyboard with blue switches, customizable backlighting, and programmable keys. Built for durability and superior typing experience.",
    category: "Electronics",
    features: ["Blue Switches", "RGB Backlight", "Programmable Keys", "Aluminum Frame"],
    rating: 4.9,
    reviews: 267,
    inStock: true
  },
  {
    id: 8,
    name: "USB-C Hub Adapter",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Multi-port USB-C hub with 4K HDMI output, SD card reader, and 100W power delivery. Compact design perfect for modern laptops.",
    category: "Electronics",
    features: ["4K HDMI", "SD Card Reader", "100W Power Delivery", "7 Ports"],
    rating: 4.3,
    reviews: 178,
    inStock: true
  },
  {
    id: 9,
    name: "Laptop Stand",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Adjustable aluminum laptop stand with cable management and improved airflow. Compatible with laptops from 11-17 inches.",
    category: "Electronics",
    features: ["Adjustable Height", "Cable Management", "Aluminum Build", "Improved Airflow"],
    rating: 4.5,
    reviews: 203,
    inStock: true
  },
  {
    id: 10,
    name: "Desk Organizer Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Complete desk organization set with pen holder, phone stand, and cable management tray. Helps maintain a clean and productive workspace.",
    category: "Office Supplies",
    features: ["Pen Holder", "Phone Stand", "Cable Management", "Bamboo Material"],
    rating: 4.2,
    reviews: 145,
    inStock: true
  },
  {
    id: 11,
    name: "LED Desk Lamp",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Modern LED desk lamp with adjustable brightness, color temperature control, and USB charging port. Perfect eye-friendly lighting for work or study.",
    category: "Lighting",
    features: ["Adjustable Brightness", "Color Temperature", "USB Charging", "Touch Control"],
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 12,
    name: "Wireless Phone Charger",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Fast wireless phone charger with 15W output and compatibility with all modern devices. Compact design with LED indicator.",
    category: "Electronics",
    features: ["15W Fast Charging", "Universal Compatibility", "LED Indicator", "Compact Design"],
    rating: 4.4,
    reviews: 167,
    inStock: true
  },
  {
    id: 13,
    name: "Monitor Light Bar",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "RGB monitor light bar with bias lighting for reduced eye strain. Includes remote control and multiple scene modes.",
    category: "Lighting",
    features: ["RGB Lighting", "Bias Lighting", "Remote Control", "Multiple Scenes"],
    rating: 4.7,
    reviews: 134,
    inStock: true
  },
  {
    id: 14,
    name: "Cable Management Box",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Under-desk cable management box with multiple compartments and easy access. Keeps cables organized and out of sight.",
    category: "Office Supplies",
    features: ["Multiple Compartments", "Easy Access", "Dust Protection", "Non-slip Base"],
    rating: 4.3,
    reviews: 98,
    inStock: true
  },
  {
    id: 15,
    name: "Webcam HD Pro",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1586950155808-ae2bc00d9c6?ixlib=rb-4.0.3&ixid=MnwxOjR2VyWxEWQ1w7W&auto=format&fit=crop&w=800&q=80",
    description: "Professional 1080p HD webcam with auto-focus and noise reduction. Perfect for video calls and content creation.",
    category: "Electronics",
    features: ["1080p HD", "Auto Focus", "Noise Reduction", "Wide Angle"],
    rating: 4.5,
    reviews: 212,
    inStock: true
  }
];

// Get unique categories
export const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Lighting"
];

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Get products by category
export const getProductsByCategory = (category) => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

// Search products
export const searchProducts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
};
