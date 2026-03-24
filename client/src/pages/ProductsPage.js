import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const ProductsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const FilterSidebar = styled.aside`
  flex: 0 0 250px;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  h3 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.3rem;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: #667eea;
    }
  }
`;


const PriceDisplay = styled.div`
  text-align: center;
  color: #667eea;
  font-weight: bold;
`;

const ProductsSection = styled.section`
  flex: 1;
  min-width: 300px;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  h2 {
    font-size: 1.8rem;
    color: #333;
  }
`;

const SortDropdown = styled.div`
  select {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

// Mock product data (this would come from your backend API)
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "phones",
    brand: "apple",
    price: 99999,
    rating: 4.8,
    reviews: 2453,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    image: "/assets/images/iphone.webp"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "phones",
    brand: "samsung",
    price: 107999,
    rating: 4.7,
    reviews: 1876,
    description: "Premium Android phone with S Pen, 200MP camera, and AMOLED display",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Galaxy+S24+Ultra"
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    category: "laptops",
    brand: "apple",
    price: 199999,
    rating: 4.9,
    reviews: 1234,
    description: "Powerful laptop with M3 Max chip, stunning retina display, and all-day battery",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=MacBook+Pro+16"
  },
  {
    id: 4,
    name: "Dell XPS 15",
    category: "laptops",
    brand: "dell",
    price: 149999,
    rating: 4.6,
    reviews: 987,
    description: "High-performance Windows laptop with 4K display and powerful graphics",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+XPS+15"
  },
  {
    id: 5,
    name: "Samsung 65\" QLED 4K TV",
    category: "tvs",
    brand: "samsung",
    price: 99999,
    rating: 4.7,
    reviews: 1543,
    description: "Premium QLED TV with vibrant colors, smart features, and gaming mode",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+QLED+TV"
  },
  {
    id: 6,
    name: "LG 55\" OLED 4K TV",
    category: "tvs",
    brand: "lg",
    price: 119999,
    rating: 4.8,
    reviews: 2109,
    description: "Perfect black levels, infinite contrast, and Dolby Vision IQ",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+OLED+TV"
  },
  {
    id: 7,
    name: "Samsung 28 cu.ft. Refrigerator",
    category: "appliances",
    brand: "samsung",
    price: 179999,
    rating: 4.5,
    reviews: 654,
    description: "Smart refrigerator with Family Hub, ice maker, and energy efficient design",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+Refrigerator"
  },
  {
    id: 8,
    name: "LG 24 cu.ft. Smart Refrigerator",
    category: "appliances",
    brand: "lg",
    price: 149999,
    rating: 4.4,
    reviews: 432,
    description: "Smart cooling technology, InstaView door, and Wi-Fi connectivity",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+Smart+Fridge"
  },
  {
    id: 9,
    name: "HP Spectre x360 14",
    category: "laptops",
    brand: "hp",
    price: 129999,
    rating: 4.5,
    reviews: 765,
    description: "2-in-1 convertible laptop with OLED display and long battery life",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=HP+Spectre+x360"
  },
  {
    id: 10,
    name: "iPad Pro 12.9\"",
    category: "phones",
    brand: "apple",
    price: 89999,
    rating: 4.7,
    reviews: 1432,
    description: "Professional tablet with M2 chip, Liquid Retina XDR display",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=iPad+Pro+12.9"
  },
  {
    id: 11,
    name: "Sony 75\" BRAVIA XR 4K TV",
    category: "tvs",
    brand: "sony",
    price: 159999,
    rating: 4.6,
    reviews: 876,
    description: "Cognitive processor XR, perfect for gaming and movies",
    image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Sony+BRAVIA+XR"
  },
  {
    id: 12,
    name: "Dell Inspiron 15",
    category: "laptops",
    brand: "dell",
    price: 59999,
    rating: 4.3,
    reviews: 543,
    description: "Affordable laptop with good performance for everyday tasks",
    image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+Inspiron+15"
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    selectedBrands: [],
    minRating: 0
  });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, sortBy, searchParams]);

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter from URL
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Search filter
    const search = searchParams.get('search');
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Brand filter
    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        filters.selectedBrands.includes(product.brand)
      );
    }


    // Rating filter
    filtered = filtered.filter(product => product.rating >= filters.minRating);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      minRating: parseInt(rating)
    }));
  };

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  return (
    <>
      <div className="container" id="products-section">
        <ProductsContainer>
          <FilterSidebar>
            <h3>Filters</h3>
            <FilterGroup>
              <h4>Brands</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes('apple')}
                  onChange={() => handleBrandChange('apple')}
                />
                Apple
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes('samsung')}
                  onChange={() => handleBrandChange('samsung')}
                />
                Samsung
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes('dell')}
                  onChange={() => handleBrandChange('dell')}
                />
                Dell
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes('hp')}
                  onChange={() => handleBrandChange('hp')}
                />
                HP
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes('lg')}
                  onChange={() => handleBrandChange('lg')}
                />
                LG
              </label>
            </FilterGroup>
            <FilterGroup>
              <h4>Rating</h4>
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 4}
                  onChange={() => handleRatingChange(4)}
                />
                4★ & above
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 3}
                  onChange={() => handleRatingChange(3)}
                />
                3★ & above
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 2}
                  onChange={() => handleRatingChange(2)}
                />
                2★ & above
              </label>
            </FilterGroup>
          </FilterSidebar>
          <ProductsSection>
            <ProductsHeader>
              <h2>Featured Products</h2>
              <SortDropdown>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </SortDropdown>
            </ProductsHeader>
            <ProductsGrid>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductsGrid>
            {filteredProducts.length === 0 && (
              <LoadingMessage>No products found matching your criteria.</LoadingMessage>
            )}
          </ProductsSection>
        </ProductsContainer>
      </div>
      <Cart />
    </>
  );
};

export default ProductsPage;
